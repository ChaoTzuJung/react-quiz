// 不知 array 為何要 spread operator?
/* create randomizer function */
export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);