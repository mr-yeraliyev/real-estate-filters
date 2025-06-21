import type { Flat } from '@/entities/Flats'
import type { FilterValues } from '../model'

export const filterFlats = (flats: Flat[], filters: FilterValues) => {
  const { areaRange, roomRange, addressQuery } = filters
  const lowerCaseAddressQuery = addressQuery.toLowerCase()

  return flats.filter((flat) => {
    const areaMatch = flat.area >= areaRange[0] && flat.area <= areaRange[1]
    const roomsMatch = flat.rooms >= roomRange[0] && flat.rooms <= roomRange[1]
    const addressMatch = flat.address.toLowerCase().includes(lowerCaseAddressQuery)

    return areaMatch && roomsMatch && addressMatch
  })
}
