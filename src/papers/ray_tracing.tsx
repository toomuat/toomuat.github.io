import { useEffect, useState } from "react";
import { PapersList, ReadonlyPaperInfo, ReadPapersInfo } from "../papers"

const _papers: ReadonlyPaperInfo[] = [
  {
    title: "Effects of Ions on Whistler-Mode Ray Tracing",
    reference: 'Kimura, Iwane. "Effects of ions on whistler-mode ray tracing." Radio Science 1.3 (1966): 269-283.',
    authors: ["None"],
    keywords: ["None"],
  },
  {
    title: "Some techniques for shading machine renderings of solids",
    reference: 'Appel, Arthur. "Some techniques for shading machine renderings of solids." Proceedings of the April 30--May 2, 1968, spring joint computer conference. 1968.',
    authors: ["None"],
    keywords: ["Ray casting"],
  },
];

export default function RayTracing() {
  const [papers_info, setPapersInfo] = useState<ReadonlyPaperInfo[]>([]);

  useEffect(() => {
    const papers_info_promise = ReadPapersInfo("ray_tracing.txt")
    // console.log("RayTracing")
    papers_info_promise.then(result => {
      setPapersInfo(result)
    })
  }, [])

  return (
    <>
      <h2>Ray tracing papers</h2>
      <PapersList papers={papers_info}></PapersList>
    </>
  )
}
