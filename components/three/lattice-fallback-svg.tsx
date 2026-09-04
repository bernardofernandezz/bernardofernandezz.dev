interface LatticePoint {
  readonly x: number
  readonly y: number
}

interface LatticeEdge {
  readonly a: LatticePoint
  readonly b: LatticePoint
}

interface AccentNode {
  readonly x: number
  readonly y: number
}

const GRID = 6
const STEP = 34
const VIEW_WIDTH = 400
const VIEW_HEIGHT = 440

/*
 * Static isometric projection of the 6×6×6 lattice — the same geometry the
 * interactive canvas renders, generated deterministically so the SVG is
 * identical on the server and the client. Only the three visible faces are
 * drawn to keep the markup light.
 */
function project(x: number, y: number, z: number): LatticePoint {
  const cos30 = Math.cos(Math.PI / 6)
  const sin30 = 0.5
  return {
    x: VIEW_WIDTH / 2 + (x - z) * cos30 * STEP,
    y: VIEW_HEIGHT / 2 - 30 + (x + z) * sin30 * STEP - y * STEP * 0.82,
  }
}

function buildWireframe(): { edges: LatticeEdge[]; accents: AccentNode[] } {
  const edges: LatticeEdge[] = []
  const accents: AccentNode[] = []
  const seen = new Set<string>()

  const pushEdge = (a: LatticePoint, b: LatticePoint) => {
    const key = `${a.x},${a.y}-${b.x},${b.y}`
    if (seen.has(key)) return
    seen.add(key)
    edges.push({ a, b })
  }

  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID - 1; j++) {
      // Top face (y = 0)
      pushEdge(project(j, 0, i), project(j + 1, 0, i))
      pushEdge(project(i, 0, j), project(i, 0, j + 1))
      // Left face (x = 0)
      pushEdge(project(0, j, i), project(0, j + 1, i))
      pushEdge(project(0, i, j), project(0, i, j + 1))
      // Right face (z = GRID - 1)
      pushEdge(project(j, i, GRID - 1), project(j + 1, i, GRID - 1))
      pushEdge(project(i, j, GRID - 1), project(i, j + 1, GRID - 1))
    }
    // Accent nodes — the same deterministic rule as the canvas scene.
    if ((i + 3 * (GRID - 1)) % 9 === 0) {
      accents.push(project(i, 0, GRID - 1))
    }
    if ((2 * i + 3 * 0) % 9 === 0) {
      accents.push(project(0, i, 0))
    }
  }

  return { edges, accents }
}

const WIREFRAME = buildWireframe()

export function LatticeFallbackSvg({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className={className} aria-hidden="true" fill="none">
      <g className="stroke-border">
        {WIREFRAME.edges.map((edge, index) => (
          <line
            key={index}
            x1={edge.a.x}
            y1={edge.a.y}
            x2={edge.b.x}
            y2={edge.b.y}
          />
        ))}
      </g>
      <g>
        {WIREFRAME.accents.map((node, index) => (
          <circle key={index} cx={node.x} cy={node.y} r="4.2" className="fill-current project-accent" />
        ))}
      </g>
    </svg>
  )
}
