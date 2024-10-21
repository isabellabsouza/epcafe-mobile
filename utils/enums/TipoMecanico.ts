const TipoMecanico = {
    IMPLEMENTOS: {
        ABASTECEDOR_FERTILIZANTES: {
            nome: 'Abastecedor de Fertilizantes',
            vida_util: 15,
            enum: 'ABASTECEDOR_FERTILIZANTES',
        },
        ABASTECEDOR_PULVERIZADOR: {
            nome: 'Abastecedor Pulverizador',
            vida_util: 15,
            enum: 'ABASTECEDOR_PULVERIZADOR',
        },
        ADUBADEIRA_CITROS_CAFE: {
            nome: 'Adubadeira para Citros e Café',
            vida_util: 10,
            enum: 'ADUBADEIRA_CITROS_CAFE',
        },
        ADUBADEIRA_MANUAL: {
            nome: 'Adubadeira Manual',
            vida_util: 3,
            enum: 'ADUBADEIRA_MANUAL',
        },
        APLICADOR_ADUBO: {
            nome: 'Aplicador de Adubo',
            vida_util: 10,
            enum: 'APLICADOR_ADUBO',
        },
        APLICADOR_INSETICIDA: {
            nome: 'Aplicador de Inseticida',
            vida_util: 12,
            enum: 'APLICADOR_INSETICIDA',
        },
        APLICADOR_LOCALIZADO_FERTILIZANTES: {
            nome: 'Aplicador Localizado de Fertilizantes',
            vida_util: 10,
            enum: 'APLICADOR_LOCALIZADO_FERTILIZANTES',
        },
        ARADO: {
            nome: 'Arado',
            vida_util: 15,
            enum: 'ARADO',
        },
        ARADO_AIVECA: {
            nome: 'Arado Aiveca',
            vida_util: 15,
            enum: 'ARADO_AIVECA',
        },
        BARRA_APLICADORA_HERBICIDA: {
            nome: 'Barra Aplicadora de Herbicida',
            vida_util: 8,
            enum: 'BARRA_APLICADORA_HERBICIDA',
        },
        BOMBA_IRRIGACAO: {
            nome: 'Bomba de Irrigação',
            vida_util: 5,
            enum: 'BOMBA_IRRIGACAO',
        },
        CAPINADEIRA: {
            nome: 'Capinadeira',
            vida_util: 12,
            enum: 'CAPINADEIRA',
        },
        CARRETA_AGRICOLA: {
            nome: 'Carreta Agrícola',
            vida_util: 15,
            enum: 'CARRETA_AGRICOLA',
        },
        CARRETA_BASCULANTE_CAFE: {
            nome: 'Carreta Basculante para Café',
            vida_util: 15,
            enum: 'CARRETA_BASCULANTE_CAFE',
        },
        CARRETA_BASCULANTE_METALICA: {
            nome: 'Carreta Basculante Metálica',
            vida_util: 15,
            enum: 'CARRETA_BASCULANTE_METALICA',
        },
        CARRETA_BASCULANTE_METALICA_MEDIO_PORTE: {
            nome: 'Carreta Basculante Metálica de Médio Porte',
            vida_util: 15,
            enum: 'CARRETA_BASCULANTE_METALICA_MEDIO_PORTE',
        },
        CARRETA_DISTRIBUIDORA_FERTILIZANTE_CALCARIO_ADUBO: {
            nome: 'Carreta Distribuidora de Fertilizante, Calcário e Adubo',
            vida_util: 10,
            enum: 'CARRETA_DISTRIBUIDORA_FERTILIZANTE_CALCARIO_ADUBO',
        },
        CARRETA_PULVERIZADORA: {
            nome: 'Carreta Pulverizadora',
            vida_util: 8,
            enum: 'CARRETA_PULVERIZADORA',
        },
        COLHEDORA_CAFE_AUTOMOTRIZ: {
            nome: 'Colhedora de Café Automotriz',
            vida_util: 10,
            enum: 'COLHEDORA_CAFE_AUTOMOTRIZ',
        },
        CULTIVADOR: {
            nome: 'Cultivador',
            vida_util: 12,
            enum: 'CULTIVADOR',
        },
        CULTIVADOR_SUBSOLADOR: {
            nome: 'Cultivador Subsolador',
            vida_util: 12,
            enum: 'CULTIVADOR_SUBSOLADOR',
        },
        DECOTADEIRA_RECEPADEIRA: {
            nome: 'Decotadeira Recepadeira',
            vida_util: 12,
            enum: 'DECOTADEIRA_RECEPADEIRA',
        },
        DISTRIBUIDOR_ADUBO_ORGANICO_CALCARIO: {
            nome: 'Distribuidor de Adubo Orgânico e Calcário',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_ADUBO_ORGANICO_CALCARIO',
        },
        DISTRIBUIDOR_ADUBO_ORGANICO_LIQUIDO: {
            nome: 'Distribuidor de Adubo Orgânico Líquido',
            vida_util: 15,
            enum: 'DISTRIBUIDOR_ADUBO_ORGANICO_LIQUIDO',
        },
        DISTRIBUIDOR_FERTILIZANTE: {
            nome: 'Distribuidor de Fertilizante',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_FERTILIZANTE',
        },
        DISTRIBUIDOR_FERTILIZANTE_CALCARIO: {
            nome: 'Distribuidor de Fertilizante e Calcário',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_FERTILIZANTE_CALCARIO',
        },
        DISTRIBUIDOR_FERTILIZANTE_CORRETIVO: {
            nome: 'Distribuidor de Fertilizante Corretivo',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_FERTILIZANTE_CORRETIVO',
        },
        DISTRIBUIDOR_FERTILIZANTE_DISCO: {
            nome: 'Distribuidor de Fertilizante a Disco',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_FERTILIZANTE_DISCO',
        },
        DISTRIBUIDOR_FERTILIZANTE_SOLIDO: {
            nome: 'Distribuidor de Fertilizante Sólido',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_FERTILIZANTE_SOLIDO',
        },
        DISTRIBUIDOR_FERTILIZANTES_ORGANICOS: {
            nome: 'Distribuidor de Fertilizantes Orgânicos',
            vida_util: 10,
            enum: 'DISTRIBUIDOR_FERTILIZANTES_ORGANICOS',
        },
        ENLEIRADEIRA_GRAO_CAFE: {
            nome: 'Enleiradeira para Grão de Café',
            vida_util: 10,
            enum: 'ENLEIRADEIRA_GRAO_CAFE',
        },
        ENXADA_ROTATIVA: {
            nome: 'Enxada Rotativa',
            vida_util: 12,
            enum: 'ENXADA_ROTATIVA',
        },
        ENXADA_ROTATIVA_MEXEDOR_CAMA_AVIARIO: {
            nome: 'Enxada Rotativa e Mexedor de Cama de Aviário',
            vida_util: 12,
            enum: 'ENXADA_ROTATIVA_MEXEDOR_CAMA_AVIARIO',
        },
        GRADE_ARADORA: {
            nome: 'Grade Aradora',
            vida_util: 15,
            enum: 'GRADE_ARADORA',
        },
        GRADE_NIVELADORA: {
            nome: 'Grade Niveladora',
            vida_util: 15,
            enum: 'GRADE_NIVELADORA',
        },
        GUINCHO_AGRICOLA: {
            nome: 'Guincho Agrícola',
            vida_util: 12,
            enum: 'GUINCHO_AGRICOLA',
        },
        INCORPORADOR_FERTILIZANTE: {
            nome: 'Incorporador de Fertilizante',
            vida_util: 10,
            enum: 'INCORPORADOR_FERTILIZANTE',
        },
        LAMINA_ENLEIRADORA: {
            nome: 'Lâmina Enleiradora',
            vida_util: 15,
            enum: 'LAMINA_ENLEIRADORA',
        },
        MANEJO_SOLO_TRITURADOR: {
            nome: 'Manejo de Solo Triturador',
            vida_util: 12,
            enum: 'MANEJO_SOLO_TRITURADOR',
        },
        PA_CARREGADEIRA_TRASEIRA: {
            nome: 'Pá Carregadeira Traseira',
            vida_util: 12,
            enum: 'PA_CARREGADEIRA_TRASEIRA',
        },
        PLANTADEIRA_ADUBADEIRA: {
            nome: 'Plantadeira Adubadeira',
            vida_util: 15,
            enum: 'PLANTADEIRA_ADUBADEIRA',
        },
        PLANTADEIRA_CAFE: {
            nome: 'Plantadeira de Café',
            vida_util: 15,
            enum: 'PLANTADEIRA_CAFE',
        },
        PLATAFORMA: {
            nome: 'Plataforma',
            vida_util: 10,
            enum: 'PLATAFORMA',
        },
        PODADEIRA: {
            nome: 'Podadeira',
            vida_util: 12,
            enum: 'PODADEIRA',
        },
        PODADEIRA_HIDRAULICA: {
            nome: 'Podadeira Hidráulica',
            vida_util: 12,
            enum: 'PODADEIRA_HIDRAULICA',
        },
        PULVERIZADOR_ACOPLADO: {
            nome: 'Pulverizador Acoplado',
            vida_util: 8,
            enum: 'PULVERIZADOR_ACOPLADO',
        },
        PULVERIZADOR_ARRASTO: {
            nome: 'Pulverizador de Arrasto',
            vida_util: 8,
            enum: 'PULVERIZADOR_ARRASTO',
        },
        PULVERIZADOR_CANHAO: {
            nome: 'Pulverizador Canhão',
            vida_util: 8,
            enum: 'PULVERIZADOR_CANHAO',
        },
        PULVERIZADOR_COSTAL: {
            nome: 'Pulverizador Costal',
            vida_util: 5,
            enum: 'PULVERIZADOR_COSTAL',
        },
        PULVERIZADOR_HIDRAULICO: {
            nome: 'Pulverizador Hidráulico',
            vida_util: 8,
            enum: 'PULVERIZADOR_HIDRAULICO',
        },
        PULVERIZADOR_MANUAL: {
            nome: 'Pulverizador Manual',
            vida_util: 5,
            enum: 'PULVERIZADOR_MANUAL',
        },
        PULVERIZADOR_REBOCADO: {
            nome: 'Pulverizador Rebocado',
            vida_util: 8,
            enum: 'PULVERIZADOR_REBOCADO',
        },
        PULVERIZADOR_TRACIONADO: {
            nome: 'Pulverizador Tracionado',
            vida_util: 8,
            enum: 'PULVERIZADOR_TRACIONADO',
        },
        PULVERIZADOR_TURBINA_FRUTICULTURA: {
            nome: 'Pulverizador Turbina para Fruticultura',
            vida_util: 8,
            enum: 'PULVERIZADOR_TURBINA_FRUTICULTURA',
        },
        PULVERIZADOR_TURBO_ATOMIZADOR: {
            nome: 'Pulverizador Turbo Atomizador',
            vida_util: 8,
            enum: 'PULVERIZADOR_TURBO_ATOMIZADOR',
        },
        PULVERIZADORA_CANHAO: {
            nome: 'Pulverizadora Canhão',
            vida_util: 8,
            enum: 'PULVERIZADORA_CANHAO',
        },
        RASTELO_CAFE: {
            nome: 'Rastelo para Café',
            vida_util: 3,
            enum: 'RASTELO_CAFE',
        },
        RECOLHEDORA_CAFE: {
            nome: 'Recolhedora de Café',
            vida_util: 10,
            enum: 'RECOLHEDORA_CAFE',
        },
        ROCADEIRA: {
            nome: 'Roçadeira',
            vida_util: 12,
            enum: 'ROCADEIRA',
        },
        ROCADEIRA_ARRASTO: {
            nome: 'Roçadeira de Arrasto',
            vida_util: 12,
            enum: 'ROCADEIRA_ARRASTO',
        },
        ROCADEIRA_HIDRAULICA: {
            nome: 'Roçadeira Hidráulica',
            vida_util: 12,
            enum: 'ROCADEIRA_HIDRAULICA',
        },
        ROCADEIRA_LATERAL: {
            nome: 'Roçadeira Lateral',
            vida_util: 12,
            enum: 'ROCADEIRA_LATERAL',
        },
        SOPRADOR_TRASEIRO_CAFE: {
            nome: 'Soprador Traseiro para Café',
            vida_util: 5,
            enum: 'SOPRADOR_TRASEIRO_CAFE',
        },
        SUBSOLADOR: {
            nome: 'Subsolador',
            vida_util: 15,
            enum: 'SUBSOLADOR',
        },
        SULCADOR: {
            nome: 'Sulcador',
            vida_util: 15,
            enum: 'SULCADOR',
        },
        SULCADOR_ADUBADOR: {
            nome: 'Sulcador Adubador',
            vida_util: 15,
            enum: 'SULCADOR_ADUBADOR',
        },
        SULCADOR_ADUBADOR_ABRIDOR_SULCO: {
            nome: 'Sulcador Adubador com Abridor de Sulco',
            vida_util: 15,
            enum: 'SULCADOR_ADUBADOR_ABRIDOR_SULCO',
        },
        SULCADOR_ADUBADOR_CANAVIEIRO: {
            nome: 'Sulcador Adubador Canavieiro',
            vida_util: 15,
            enum: 'SULCADOR_ADUBADOR_CANAVIEIRO',
        },
        SULCADOR_CANAVIEIRO: {
            nome: 'Sulcador Canavieiro',
            vida_util: 15,
            enum: 'SULCADOR_CANAVIEIRO',
        },
        SULCADOR_TANDEM_CAFE: {
            nome: 'Sulcador Tandem para Café',
            vida_util: 15,
            enum: 'SULCADOR_TANDEM_CAFE',
        },
        TRITURADOR_CITROS_CAFE: {
            nome: 'Triturador para Citros e Café',
            vida_util: 12,
            enum: 'TRITURADOR_CITROS_CAFE',
        },
        OUTROS_IMPLEMENTOS: {
            nome: 'Outros Implementos',
            vida_util: 0,
            enum: 'OUTROS_IMPLEMENTOS',
        }
    },
    MAQUINAS: {
        ABANADOR_CEREAL: {
            nome: 'Abanador de Cereal',
            vida_util: 10,
            enum: 'ABANADOR_CEREAL',
        },
        ADUBADORA_AUTOPROPELIDA: {
            nome: 'Adubadora Autopropelida',
            vida_util: 10,
            enum: 'ADUBADORA_AUTOPROPELIDA',
        },
        APLICADOR_AUTOPROPELIDO: {
            nome: 'Aplicador Autopropelido',
            vida_util: 10,
            enum: 'APLICADOR_AUTOPROPELIDO',
        },
        ATOMIZADOR_COSTAL_MOTORIZADO: {
            nome: 'Atomizador Costal Motorizado',
            vida_util: 8,
            enum: 'ATOMIZADOR_COSTAL_MOTORIZADO',
        },
        CAMINHAO: {
            nome: 'Caminhão',
            vida_util: 10,
            enum: 'CAMINHAO',
        },
        COLHEDORA_AUTOMOTRIZ_CAFE: {
            nome: 'Colhedora Automotriz de Café',
            vida_util: 10,
            enum: 'COLHEDORA_AUTOMOTRIZ_CAFE',
        },
        COLHEDORA_CAFE: {
            nome: 'Colhedora de Café',
            vida_util: 10,
            enum: 'COLHEDORA_CAFE',
        },
        DERRICADORA: {
            nome: 'Derriçadora',
            vida_util: 10,
            enum: 'DERRICADORA',
        },
        MICROTRATOR: {
            nome: 'Microtrator',
            vida_util: 10,
            enum: 'MICROTRATOR',
        },
        MOTO_SERRA: {
            nome: 'Moto Serra',
            vida_util: 10,
            enum: 'MOTO_SERRA',
        },
        MOTORROCADEIRA: {
            nome: 'Motorroçadeira',
            vida_util: 10,
            enum: 'MOTORROCADEIRA',
        },
        PA_CARREGADEIRA: {
            nome: 'Pá Carregadeira',
            vida_util: 10,
            enum: 'PA_CARREGADEIRA',
        },
        PULVERIZADOR: {
            nome: 'Pulverizador',
            vida_util: 10,
            enum: 'PULVERIZADOR',
        },
        ROCADEIRA_MANUAL: {
            nome: 'Roçadeira Manual',
            vida_util: 8,
            enum: 'ROCADEIRA_MANUAL',
        },
        SOPRADOR: {
            nome: 'Soprador',
            vida_util: 5,
            enum: 'SOPRADOR',
        },
        TRATOR: {
            nome: 'Trator',
            vida_util: 10,
            enum: 'TRATOR',
        },
        TRATOR_DE_RODA_PEQUENO_PORTE: {
            nome: 'Trator de Roda de Pequeno Porte',
            vida_util: 10,
            enum: 'TRATOR_DE_RODA_PEQUENO_PORTE',
        },
        TRITURADOR: {
            nome: 'Triturador',
            vida_util: 12,
            enum: 'TRITURADOR',
        },
        OUTRAS_MAQUINAS: {
            nome: 'Outras Máquinas',
            vida_util: 0,
            enum: 'OUTRAS_MAQUINAS',
        },
    },
    getNome(tipo: string, enumTipo: string) {
        console.log('tipo',tipo,'enumtipo',enumTipo);
        if (tipo === 'IMPLEMENTO'){
            return this.IMPLEMENTOS[enumTipo as keyof typeof this.IMPLEMENTOS]?.nome ?? '';
        }else{
            return this.MAQUINAS[enumTipo as keyof typeof this.MAQUINAS].nome;
        }
    }

}
export default TipoMecanico;