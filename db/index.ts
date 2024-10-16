import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { setGenerator } from '@nozbe/watermelondb/utils/common/randomId'
import * as Crypto from 'expo-crypto'
import schema from './schema'
import migrations from './migrations'
import Maquina from './model/Maquina'
import Tenant from './model/Tenant'
import Unidade from './model/Unidade'
import Usuario from './model/Usuario'
import Fertilizante from './model/Fertilizante'
import Talhao from './model/Talhao'
import NotaFiscal from './model/NotaFiscal'
import DespesaMaquina from './model/DespesaMaquina'
import DespesaFertilizante from './model/DespesaFertilizante'
import DespesaFerTalhao from './model/DespesaFerTalhao'

setGenerator(() => Crypto.randomUUID())

const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  // migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true, /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
      Maquina,
      Tenant,
      Unidade,
      Usuario,
      Fertilizante,
      Talhao,
      NotaFiscal,
      DespesaMaquina,
      DespesaFertilizante,
      DespesaFerTalhao,
    ],
})

export default database;

export const maquinasCollection = database.get<Maquina>('maquina')
export const tenantsCollection = database.get<Tenant>('tenant')
export const unidadesCollection = database.get<Unidade>('unidade')
export const usuariosCollection = database.get<Usuario>('usuario')
export const fertilizantesCollection = database.get<Fertilizante>('fertilizante')
export const talhoesCollection = database.get<Talhao>('talhao')
export const notasCollection = database.get<NotaFiscal>('nota_fiscal')
export const despesasMaquinasCollection = database.get<DespesaMaquina>('despesa_maquina')
export const despesasFertilizantesCollection = database.get<DespesaFertilizante>('despesa_fertilizante')
export const despesasFerTalhoesCollection = database.get<DespesaFerTalhao>('despesa_fer_talhao')