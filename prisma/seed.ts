// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Création des tags
  const tags = [
   'DeveloppementWeb',
   'ApplicationMobile',
   'IntelligenceArtificielle',
   'InternetDesObjets',
   'SystemeEducatif',
   'SantéConnectée',
   'AgricultureIntelligente',
   'ProtectionEnvironnement',
   'SécuritéInformatique',
   'FinanceDigitale',
   'TransportInnovant',
   'CommerceEnLigne',
   'ScienceDonnées',
   'BlockchainTechnologie',
   'AccessibilitéNumerique',
   'EnergieRenouvelable',
   'GestionDechets',
   'SmartCity',
   'RessourcesHumaines',
   'CommunicationDigitale'
  ]
  // Créer chaque tag
  for (const tag of tags) {
    await prisma.tag.create({
      data: {
        label: tag
      }
    })
  }

  console.log('Seeds completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
