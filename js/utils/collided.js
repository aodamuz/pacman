export default (player, ghost) => {
    return Math.sqrt(
        Math.pow(ghost.x - player.x, 2) +
        Math.pow(ghost.y - player.y, 2)
    ) < 10
}
