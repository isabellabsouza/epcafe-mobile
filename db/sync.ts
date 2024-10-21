import { synchronize } from '@nozbe/watermelondb/sync'
import database from '.'
import { supabase } from '@/lib/supabase'

export async function mySync() {
    await synchronize({
        database,
        //sendCreatedAsUpdated: true,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {

            console.log("pullChanges")

            const {data, error} = await supabase.rpc('pull', {
                last_pulled_at: lastPulledAt,
                schemaversion: schemaVersion,
                migration: migration
            });
            console.log(error)
            console.log(JSON.stringify(data))
            console.log(data.changes.maquina.created)
            console.log(data.changes.maquina.updated)
            console.log(data.changes.maquina.deleted)
            return {changes: data.changes, timestamp: data.timestamp};

            //return {changes: {}, timestamp: +new Date()};
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
            console.log("pushChanges")

            const {error} = await supabase.rpc('push', {changes});

            if (error){
                console.log('Erro: ' , error);
            } else {
                console.log('Sincronizado com sucesso');
            }
            console.log(changes)
        }
    })
}