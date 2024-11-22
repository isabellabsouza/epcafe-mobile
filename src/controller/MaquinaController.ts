import { Q } from "@nozbe/watermelondb";
import database, { maquinasCollection } from "../db";
import Maquina from "../db/model/Maquina";

class MaquinaController {

    async buscarMaquina(id: string): Promise<Maquina | null> {
        try {
            const maquina = await maquinasCollection.find(id);
            return maquina;
        } catch (error) {
            console.error("Erro ao buscar a máquina:", error);
            return null;
        }
    }

    async buscarMaquinasPorTenant(tenantId: string) {
        try {
            const maquinasEncontradas = await maquinasCollection
                .query(Q.where('tenant_id', Q.eq(tenantId)))
                .fetch();

            return maquinasEncontradas;
        } catch (error) {
            console.error("Erro ao buscar as máquinas:", error);
            return [];
        }
    }

    async buscarNomeMaquina(id: string): Promise<string> {
        try {
            const maquina = await this.buscarMaquina(id);
            return maquina?.nome ?? '';
        } catch (error) {
            console.error("Erro ao buscar o nome da máquina:", error);
            return '';
        }
    }

    async salvarMaquina(maquinaData: Partial<Maquina>, maquinaExistente?: Maquina): Promise<boolean> {
        console.log("Salvando máquina:", maquinaData);
        try {
            if (maquinaExistente) {
                // Atualizar máquina existente
                await database.write(async () => {
                    await maquinaExistente.update((m) => {
                        m.nome = maquinaData.nome!;
                        m.consumoMedio = maquinaData.consumoMedio!;
                        m.dataCompra = maquinaData.dataCompra!;
                        m.modelo = maquinaData.modelo!;
                        m.potencia = maquinaData.potencia!;
                        m.tipo = maquinaData.tipo!;
                        m.tipoCalculo = maquinaData.tipoCalculo!;
                        m.tipoCombustivel = maquinaData.tipoCombustivel!;
                        m.tipoInsumo = maquinaData.tipoInsumo!;
                        m.valor = maquinaData.valor!;
                        m.vidaUtil = maquinaData.vidaUtil!;
                        //@ts-ignore
                        m.tenant.id = maquinaData.tenant!;

                    });
                });
                return true;

            } else {
                // Criar nova máquina
                await database.write(async () => {
                    await maquinasCollection.create((novaMaquina) => {
                        novaMaquina.nome = maquinaData.nome!;
                        novaMaquina.consumoMedio = maquinaData.consumoMedio!;
                        novaMaquina.dataCompra = maquinaData.dataCompra!;
                        novaMaquina.modelo = maquinaData.modelo!;
                        novaMaquina.potencia = maquinaData.potencia!;
                        novaMaquina.tipo = maquinaData.tipo!;
                        novaMaquina.tipoCalculo = maquinaData.tipoCalculo!;
                        novaMaquina.tipoCombustivel = maquinaData.tipoCombustivel!;
                        novaMaquina.tipoInsumo = maquinaData.tipoInsumo!;
                        novaMaquina.valor = maquinaData.valor!;
                        novaMaquina.vidaUtil = maquinaData.vidaUtil!;
                        //@ts-ignore
                        novaMaquina.tenant.id = maquinaData.tenant!;
                    });
                });
                return true;
            }
        } catch (error) {

            console.error("Erro ao salvar a máquina:", error);
            return false;
        }
    }

    async excluirMaquina(maquina: Maquina): Promise<boolean> {
        try {
            await database.write(async () => {
                await maquina.markAsDeleted();
            });
            return true;
        } catch (error) {
            console.error("Erro ao excluir a máquina:", error);
            return false;
        }
    }
}

export default new MaquinaController();