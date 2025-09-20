import { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

// Reusable hook to animate when an element enters the viewport once
export function useScrollAnimation(animationConfig) {
  const targetRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Resolve animation targets
            const resolvedTargets = animationConfig?.targets
              ? entry.target.querySelectorAll(animationConfig.targets)
              : entry.target

            anime({
              ...animationConfig,
              targets: resolvedTargets && resolvedTargets.length !== undefined && resolvedTargets.length === 0
                ? entry.target
                : resolvedTargets,
            })

            // Run only once
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(target)

    return () => {
      try { target && observer.unobserve(target) } catch {/* noop */}
    }
  }, [animationConfig])

  return targetRef
}
