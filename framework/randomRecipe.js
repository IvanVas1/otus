export function getRandomRecipes(arr, count = 1) {
  const availableRecipes = arr.filter(item => item.inWishlist === false)

  if (availableRecipes.length === 0) {
    return count === 1 ? null : []
  }

  if (count === 1) {
    const randomIndex = Math.floor(Math.random() * availableRecipes.length)
    return availableRecipes[randomIndex].id
  }

  const result = []
  const usedIndexes = new Set()

  while (result.length < count && result.length < availableRecipes.length) {
    const randomIndex = Math.floor(Math.random() * availableRecipes.length)

    if (!usedIndexes.has(randomIndex)) {
      result.push(availableRecipes[randomIndex].id)
      usedIndexes.add(randomIndex)
    }
  }

  return result
}
