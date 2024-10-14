import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
    version: 2,
    tables: [
        tableSchema({
            name: 'maquina',
            columns: [
              { name: 'nome', type: 'string' },
              { name: 'vida_util', type: 'number' },
              { name: 'created_at', type: 'number' },
              { name: 'updated_at', type: 'number' },
            ]
        }),
    ],
});