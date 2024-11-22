import database, { despesasMaquinasCollection } from "../db";
import DespesaMaquina from "../db/model/DespesaMaquina";
import MaquinaController from "./MaquinaController";

class DespesaMaquinaController {

    async buscarDespesaMaquina(id: string): Promise<DespesaMaquina | null> {
        try {
            const despesaMaquina = await despesasMaquinasCollection.find(id);
            return despesaMaquina;
        } catch (error) {
            console.error("Erro ao buscar a despesa da máquina:", error);
            return null;
        }
    }

    async salvarDespesaMaquina(despesaMaquinaData: Partial<DespesaMaquina>, despesaMaquinaExistente?: DespesaMaquina): Promise<boolean> {
        console.log("Salvando despesa da máquina:", despesaMaquinaData);
        try {
            if (despesaMaquinaExistente) {
                // Atualizar despesa da máquina existente
                await database.write(async () => {
                    await despesaMaquinaExistente.update((dm) => {
                        dm.data = despesaMaquinaData.data!;
                        dm.distanciaTrabalhada = despesaMaquinaData.distanciaTrabalhada!;
                        dm.fatorPotencia = despesaMaquinaData.fatorPotencia!;
                        dm.precoUnitarioCombustivel = despesaMaquinaData.precoUnitarioCombustivel!
                        dm.valorTotal = despesaMaquinaData.valorTotal!
                        dm.unidadeHoras = despesaMaquinaData.unidadeHoras!
                        dm.tempoTrabalhado = despesaMaquinaData.tempoTrabalhado!
                        //@ts-ignore
                        dm.maquina.id = despesaMaquinaData.maquina!;
                        //@ts-ignore
                        dm.tenant.id = despesaMaquinaData.tenant!;
                        //@ts-ignore
                        dm.unidade.id = despesaMaquinaData.unidade!;

                    });
                });
                return true;

            } else {
                // Criar nova despesa da máquina
                await database.write(async () => {
                    await despesasMaquinasCollection.create((novaDespesaMaquina) => {
                        novaDespesaMaquina.data = despesaMaquinaData.data!;
                        novaDespesaMaquina.distanciaTrabalhada = despesaMaquinaData.distanciaTrabalhada!;
                        novaDespesaMaquina.fatorPotencia = despesaMaquinaData.fatorPotencia!;
                        novaDespesaMaquina.precoUnitarioCombustivel = despesaMaquinaData.precoUnitarioCombustivel!
                        // novaDespesaMaquina.valorTotal = this.calcularValorTotal(
                        //     despesaMaquinaData.maquina,
                        //     despesaMaquinaData.fatorPotencia,
                        //     despesaMaquinaData.tempoTrabalhado!,
                        //     despesaMaquinaData.unidadeHoras!,
                        //     despesaMaquinaData.precoUnitarioCombustivel!,
                        //     despesaMaquinaData.distanciaTrabalhada!
                        // )
                        novaDespesaMaquina.valorTotal = 17.28;
                        novaDespesaMaquina.unidadeHoras = despesaMaquinaData.unidadeHoras!
                        novaDespesaMaquina.tempoTrabalhado = despesaMaquinaData.tempoTrabalhado!
                        //@ts-ignore
                        novaDespesaMaquina.maquina.id = despesaMaquinaData.maquina!;
                        //@ts-ignore
                        novaDespesaMaquina.tenant.id = despesaMaquinaData.tenant!;
                        //@ts-ignore
                        novaDespesaMaquina.unidade.id = despesaMaquinaData.unidade!;
                    });
                });
                return true;
            }
        } catch (error) {
            console.error("Erro ao salvar a despesa da máquina:", error);
            return false;
        }
    }

    async excluirDespesaMaquina(despesaMaquina: DespesaMaquina): Promise<boolean> {
        try {
            await database.write(async () => {
                await despesaMaquina.markAsDeleted();
            });
            return true;
        } catch (error) {
            console.error("Erro ao excluir a despesa da máquina:", error);
            return false;
        }
    }

    async montarListaMaquinasPorTenant(tenantId: string) {
        try {

            const maquinasEncontradas = MaquinaController.buscarMaquinasPorTenant(tenantId);

            return (await maquinasEncontradas).map((maquina) => ({
                label: maquina.nome,
                value: maquina.id,
                tipoCalculo: maquina.tipoCalculo,
                consumoMedio: maquina.consumoMedio,
                potencia: maquina.potencia,
            }));
        } catch (error) {
            console.error("Erro ao montar a lista de máquinas:", error);
            return [];
        }
    }

    converterHoraParaMinuto(tempo: number) {
        return tempo * 60;
    }

    calcularValorTotal(maquina: any, fatorPotencia: any, tempoTrabalhado: number, unidadeHoras: boolean, precoUnitarioCombustivel: number, distanciaTrabalhada: number) {
        let valor = 0;

        //se for false (horas), converte para minutos
        const tempoConvertido = unidadeHoras == false
            ? this.converterHoraParaMinuto(tempoTrabalhado)
            : tempoTrabalhado;

        switch (maquina.tipoCalculo) {
            case 'TRATOR':
                valor = (
                    maquina.potencia *
                    (fatorPotencia.valor / 100) *
                    0.15 *
                    precoUnitarioCombustivel *
                    (tempoConvertido / 60)
                );
                break;

            case 'NAO_TRATOR':
                valor = (
                    maquina.potencia *
                    0.15 *
                    precoUnitarioCombustivel *
                    (tempoConvertido / 60)
                );
                break;

            case 'ENERGIA_ELETRICA':
                valor = (
                    maquina.potencia *
                    0.735 *
                    precoUnitarioCombustivel *
                    (tempoConvertido / 60)
                );
                break;

            case 'DISTANCIA':
                valor = (
                    distanciaTrabalhada) /
                    maquina.consumoMedio *
                    precoUnitarioCombustivel;
                console.log("valor", valor);
                break;

            default:
                valor = 0;
                break;
        }

        return Number(valor.toFixed(2));
    }

}

export default new DespesaMaquinaController();