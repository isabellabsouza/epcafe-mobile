// import { synchronize } from '@nozbe/watermelondb/sync'
// import database from '.'
// import { supabase } from '@/lib/supabase'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// export async function firstSync() {

//     console.log("check if first sync")
//     AsyncStorage
//         .getItem('firstSync')
//         .then((value) => {
//             console.log('firstSync', value)
//             if (value && value == 'true') {
//                 console.log("first sync already done, no need to pull")
//                 return;
//             }else{
//                 sync()
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//         AsyncStorage.setItem('firstSync', 'true')    
// }

// async function sync() {
//     await synchronize({
//         database,
//         pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
//             console.log("first sync! pullChanges")

//             let lastPulled = new Date(2000, 0, 1).getTime();


//             const { data, error } = await supabase.rpc('pull_first', {
//                 last_pulled_at: lastPulled,
//                 schemaversion: schemaVersion,
//                 migration: migration
//             });
//             console.log(error)
//             console.log(JSON.stringify(data))
//             return { changes: data.changes, timestamp: data.timestamp };

//             //return {changes: {}, timestamp: +new Date()};
//         },
//         pushChanges: async ({ changes, lastPulledAt }) => {
//         }
//     })
// }

import { synchronize } from '@nozbe/watermelondb/sync';
import database from '.';
import { supabase } from '@/src/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function firstSync(tenantId: string) {
  console.log('Verificando sincronização inicial');

  const isFirstSyncDone = await AsyncStorage.getItem('firstSync');
  if (isFirstSyncDone === 'true') {
    console.log('Sincronização inicial já realizada.');
    return;
  }

  try {
    await sync(tenantId);
    await AsyncStorage.setItem('firstSync', 'true'); // Marca sincronização como feita
  } catch (error) {
    console.error('Erro durante a sincronização:', error);
  }
}

async function sync(tenantId: string) {
  console.log('Iniciando sincronização...');

  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log('Executando pullChanges');

      const { data, error } = await supabase.rpc('pull_first', {
        last_pulled_at: lastPulledAt || new Date(2000, 0, 1).getTime(),
        schemaversion: schemaVersion,
        migration,
        tenant_id: tenantId, // Enviar tenant_id na sincronização
      });

      if (error) {
        console.error('Erro no pull_first:', error);
        throw error;
      }

      console.log('Dados recebidos:', data);
      return { changes: data.changes, timestamp: data.timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log('Sincronizando mudanças locais...');
      // Lógica de push (se necessário)
    },
  });
}
