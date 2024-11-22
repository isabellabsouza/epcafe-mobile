import database, { despesasFertilizantesCollection } from "../db";
import DespesaFertilizante from "../db/model/DespesaFertilizante";
import FertilizanteController from "./FertilizanteController";

class DespesaFertilizanteController {

    async buscarDespesaFertilizante(id: string): Promise<DespesaFertilizante | null> {
        try {
            const despesaFertilizante = await despesasFertilizantesCollection.find(id);
            return despesaFertilizante;
        } catch (error) {
            console.error("Erro ao buscar a despesa de fertilizante: ", error);
            return null;
        }
    }

    async montarListaFertilizantesPorTipo(tipo: string) {
        try {
            const fertilizantesEncontrados = await FertilizanteController.buscarFertilizantesPorTipo(tipo);

            return (await fertilizantesEncontrados).map((fertilizante) => ({
                label: fertilizante.nome,
                value: fertilizante.id,
            }));
        } catch (error) {
            console.error("Erro ao montar a lista de fertilizantes: ", error);
            return [];
        }
    }

    async salvarDespesaFertilizante(
        despesaFertilizanteData: Partial<DespesaFertilizante>,
        despesaFertilizanteExistente?: DespesaFertilizante
    ): Promise<string | null> {

        console.log("Salvando despesa de fertilizante:", despesaFertilizanteData);
        try {
            let id: string | null = null;
            if (despesaFertilizanteExistente) {
                // Atualizar despesa de fertilizante existente
                await database.write(async () => {
                    await despesaFertilizanteExistente.update((df) => {
                        df.data = despesaFertilizanteData.data!;
                        df.medida = despesaFertilizanteData.medida!;
                        df.valorTotal = despesaFertilizanteData.valorTotal!;
                        //@ts-ignore
                        df.fertilizante.id = despesaFertilizanteData.fertilizante!;
                        //@ts-ignore
                        df.notaFiscal.id = despesaFertilizanteData.notaFiscal!;
                        //@ts-ignore
                        df.tenant.id = despesaFertilizanteData.tenant!;
                        //@ts-ignore
                        df.unidade.id = despesaFertilizanteData.unidade!;
                    });
                });
                id = despesaFertilizanteExistente.id;

            } else {
                // Criar nova despesa de fertilizante
                await database.write(async () => {
                    const novaDespesaFertilizante = await despesasFertilizantesCollection.create((novaDespesaFertilizante) => {
                        novaDespesaFertilizante.data = despesaFertilizanteData.data!;
                        novaDespesaFertilizante.medida = despesaFertilizanteData.medida!;
                        novaDespesaFertilizante.valorTotal = despesaFertilizanteData.valorTotal!;
                        //@ts-ignore
                        novaDespesaFertilizante.fertilizante.id = despesaFertilizanteData.fertilizante!;
                        //@ts-ignore
                        novaDespesaFertilizante.notaFiscal.id = despesaFertilizanteData.notaFiscal!;
                        //@ts-ignore
                        novaDespesaFertilizante.tenant.id = despesaFertilizanteData.tenant!;
                        //@ts-ignore
                        novaDespesaFertilizante.unidade.id = despesaFertilizanteData.unidade!;
                    });
                    id = novaDespesaFertilizante.id;
                });
            }
            return id;
        } catch (error) {
            console.error("Erro ao salvar a despesa de fertilizante: ", error);
            return null;
        }
    }

    async excluirDespesaFertilizante(despesaFertilizante: DespesaFertilizante): Promise<boolean> {
        try {
            await database.write(async () => {
                await despesaFertilizante.markAsDeleted();
            });
            return true;
        } catch (error) {
            console.error("Erro ao excluir a despesa de fertilizante: ", error);
            return false;
        }
    }
}

export default new DespesaFertilizanteController();