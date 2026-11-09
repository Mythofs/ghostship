**Pumpkin Heist**

This is a short game about clicking pumpkins. You love pumpkins but are broke so you have to resort to stealing them from the local farm.

However, the farmer is patrolling their farmer so you must avoid them.

**How to play**
1. Click to start
2. Click on the orange pumpkins to gain points based on how early you click it
3. The pumpkins disappears and spawns somewhere else, getting faster as your points increase
4. Avoid clicking on the farmer which will end your run
5. Try to beat your highest score

**How it was made**

This project was made with p5.js

- Increased spawning speed made using lerp
- Pumpkins fading away by changing alpha value
- Farmer object draw using ellipses/triangles/circles for the face and ellipses/rectangles for the hat
- Moving farmer made by storing x/y velocity and bouncing off edges by multiplying x/y by -1 based on farmer location
