import { synchronize } from '@nozbe/watermelondb/sync'
import database from '.'
import { supabase } from '@/lib/supabase'

export async function mySync() {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
            console.log("pullChanges")

            
            const {data, error} = await supabase.rpc('pull', {
                last_pulled_at: lastPulledAt,
                schemaversion: schemaVersion,
                migration: migration
            });
            console.log(error)
            console.log(data)
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