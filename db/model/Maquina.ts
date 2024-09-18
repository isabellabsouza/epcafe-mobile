// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Maquina extends Model {
  static table = 'maquina'

  @text('nome')
  nome!: string;
  @field('vida_util')
  vida_util!: number;
}