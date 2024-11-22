import { Q } from "@nozbe/watermelondb";
import database, { fertilizantesCollection } from "../db";
import Fertilizante from "../db/model/Fertilizante";

class FertilizanteController {

    async buscarFertilizante(id: string): Promise<Fertilizante | null> {
        try {
            const fertilizante = await fertilizantesCollection.find(id);
            return fertilizante;
        } catch (error) {
            console.error("Erro ao buscar o fertilizante: ", error);
            return null;
        }
    }

    async buscarFertilizantesPorTipo(tipo: string) {
        try {
            const fertilizantesEncontrados = await fertilizantesCollection
            .query(
                Q.where('tipo', tipo),
                Q.sortBy('id')
            )
            .fetch();

            return fertilizantesEncontrados;
        } catch (error) {
            console.error("Erro ao buscar os fertilizantes: ", error);
            return [];
        }
    }

    async salvarFertilizante(fertilizanteData: Partial<Fertilizante>, fertilizanteExistente?: Fertilizante): Promise<boolean> {
        console.log("Salvando fertilizante: ", fertilizanteData);
        try {
            if (fertilizanteExistente) {
                // Atualizar fertilizante existente
                await database.write(async () => {
                    await fertilizanteExistente.update((f) => {
                        Object.assign(f, fertilizanteData);
                    });
                });
                return true;

            } else {
                // Criar novo fertilizante
                await database.write(async () => {
                    await fertilizantesCollection.create((novoFertilizante) => {
                        Object.assign(novoFertilizante, fertilizanteData);
                    });
                });
                return true;
            }
        } catch (error) {
            console.error("Erro ao salvar o fertilizante: ", error);
            return false;
        }
    }
}

export default new FertilizanteController();