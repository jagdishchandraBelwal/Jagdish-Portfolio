# Jagdish Belwal · 3D Portfolio ("The Studio Lobby")

Visitors arrive in a 3D office lobby. **Aria**, the receptionist, greets them and
walks them through seven rooms, one per portfolio section.

| Stop | Room | Content |
|---|---|---|
| 1 | Reception | Intro, resume, "Let's Connect" |
| 2 | Meeting Room | About Me |
| 3 | Skills Lab | Floating skill tiles |
| 4 | Office Floor | Work Experience |
| 5 | Gallery | Projects |
| 6 | Library | Education |
| 7 | Contact Desk | Email, phone, LinkedIn, GitHub, resume |

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Needs Node 18+.

## How visitors use it

- **Start Tour** → Aria walks to each room, the camera follows, content appears when she arrives.
- **Follow me →** / **← Back** (or the arrow keys) move between stops.
- **Rooms** menu (top right) jumps to any room. Aria runs there.
- **Drag** to look around, scroll/pinch to zoom.
- **Skip to Resume** and **2D version** are always available.
- On phones, low-power devices, "reduce motion" users and browsers without WebGL
  the **2D version starts by default** (with a button to try the 3D tour).
  If the 3D scene ever crashes, it falls back to 2D automatically.

## Editing your content

Everything lives in **`src/data.js`**: name, tagline, resume link, about text,
skills, jobs, projects, education, contact links and Aria's dialogue for each
room. Edit once and both the 3D tour and the 2D page update.

## Project layout

```
src/
  data.js            all content + the list of tour stops
  store.js           tour state (zustand) + 3D/2D detection
  App.jsx            picks 3D or 2D, lazy-loads three.js, error fallback
  Experience.jsx     the <Canvas>, lights, fog
  Portfolio2D.jsx    your original page, now reading from data.js
  scene/
    Aria.jsx         low-poly receptionist: walking, waving, pointing
    CameraRig.jsx    camera follows Aria; visitor can still orbit
    World.jsx        ground, corridors with a dotted trail
    Rooms.jsx        the 7 rooms and their content panels
    prims.jsx        small reusable shapes (Box, Cyl, Plant, Chair...)
    shared.js        Aria's walking graph / positions
  ui/Overlay.jsx     speech bubble, tour controls, room menu
```

## Tweaks

- **Room order/spacing:** `STOPS` and `ROOM_SPACING` in `src/data.js`.
- **Where Aria stands in a room:** `HOST_OFFSET` in `src/data.js`.
- **Colors:** room floors are set per room in `src/scene/Rooms.jsx`; the brand
  orange is `#ea580c`.
- **Aria's look:** colors at the top of `src/scene/Aria.jsx`.
- **Card size on screen:** the `df` / `distanceFactor` values on each `Panel`
  in `Rooms.jsx` (bigger = larger cards).
- **Lighting too dark/bright:** the three lights in `src/Experience.jsx`.

## Notes

- The "Intro" link in the 2D nav now points to `#hero` (it pointed to a missing `#intro`).
- Content is unchanged from the original page.
