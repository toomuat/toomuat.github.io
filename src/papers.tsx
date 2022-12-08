type PaperInfo = {
  title: string;
  reference: string;
  authors: string[];
  keywords?: string[];
}
export type ReadonlyPaperInfo = Readonly<PaperInfo>
type PaperInfoProp = {
  readonly papers: PaperInfo[]
}

export async function ReadPapersInfo(file_path: string): Promise<ReadonlyPaperInfo[]> {
  const papers_info: PaperInfo[] = [];
  const res = await fetch(file_path)
  const text = await res.text()
  const lines: string[] = text.split(/\r?\n/)
  const papers = [];

  while (lines.length > 0) {
    const sub_array = []
    let elem = lines.shift()
    while (elem != undefined && elem != "") {
      sub_array.push(elem)
      elem = lines.shift()
    }
    if (sub_array.length == 0) { continue }
    papers.push(sub_array)
  }

  for (const paper of papers) {
    const title: string = paper.shift() as string
    const reference: string = paper.shift() as string
    const authors: string[] = [];
    const keywords: string[] = paper;

    const paper_info: PaperInfo = {
      title,
      reference,
      authors,
      keywords,
    }
    papers_info.push(paper_info)
  }

  return papers_info
}

export const PapersList: React.FC<PaperInfoProp> = ({ papers }) => {
  const papersList = papers.map((paper, index) => {
    const authors = paper.authors.map((authors, i) => <p key={i}>{authors}</p>)
    const keywords = paper.keywords?.map((keywords, i) => <p key={i}>{keywords}</p>)
    return <li key={index}>
      <p>{paper.title}</p>
      <p>{paper.reference}</p>
      {authors && <div>{authors}</div>}
      {keywords && <div>{keywords}</div>}
    </li>
  })
  return <ul>{papersList}</ul>
}

export default function Papers() {
  return (
    <>
      <p>Papers</p>
      <a href={`papers/ray_tracing`}>Ray tracing</a>
    </>
  )
}
