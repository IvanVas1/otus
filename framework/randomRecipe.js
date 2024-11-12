export function randomRecipe(arr) {
  const availableRecipes = arr.filter(item => item.inWishlist === false)
  if (availableRecipes.length === 0) {
    return null
  }
  let randomIndex = arr[Math.floor(Math.random() * arr.length)]
  return randomIndex.id
}
