import { useEffect, useState } from "react";
import { PapersList, ReadonlyPaperInfo, ReadPapersInfo } from "../papers"

export default function RayTracing() {
  const [papers_info, setPapersInfo] = useState<ReadonlyPaperInfo[]>([]);

  useEffect(() => {
    const papers_info_promise = ReadPapersInfo("ray_tracing.txt")
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
