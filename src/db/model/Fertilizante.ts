import { Model } from "@nozbe/watermelondb";
import { text, readonly, date } from "@nozbe/watermelondb/decorators";

export default class Fertilizante extends Model {
    static table = 'fertilizante'

    @text('nome') nome!: string;
    @text('tipo') tipo!: string;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}