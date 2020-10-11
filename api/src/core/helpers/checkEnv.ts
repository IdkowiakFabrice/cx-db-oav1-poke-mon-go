import {isEmpty} from 'lodash'

export default function checkEnv(keys: string[]) {

  if (isEmpty(keys)) {
    return
  }

  const missingValues = keys.filter((k: string) => !(k in process.env))

  if (!isEmpty(missingValues)) {
    throw new Error(`Valeurs non trouvé [ ${missingValues.join(', ')} ]`)
  }
}