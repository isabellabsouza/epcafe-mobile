// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class Maquina extends Model {
  static table = 'maquina'

  @text('nome')
  nome!: string;
  @field('vida_util')
  vida_util!: number;
  @readonly @date('created_at') createdAt!: string;
  @readonly @date('updated_at') updatedAt!: string;
}