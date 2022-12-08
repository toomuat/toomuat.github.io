import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./papers.module.css"

type PaperInfo = {
  title: string;
  reference: string;
  authors: string[];
  keywords?: string[];
}
export type ReadonlyPaperInfo = Readonly<PaperInfo>
type PaperInfoProp = {
  readonly papers: PaperInfo[],
  readonly search_word: string
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

export const PapersListSub: React.FC<PaperInfoProp> = ({ papers, search_word }) => {
  const papersList = papers.filter(paper =>
    search_word.length == 0 || // Pass everything when search window is empty
    paper.keywords &&
    paper.keywords.some(
      keyword => keyword.toLowerCase().includes(search_word.toLowerCase())
    )
  ).map((paper, index) => {
    const authors = paper.authors.map((authors, i) => <p key={i}>{authors}</p>)
    const keywords = paper.keywords?.map((keywords, i) => <span key={i} className={style.keyword}>{keywords}</span>)
    return <li key={index} className={style.li}>
      <h3>{paper.title}</h3>
      <p>{paper.reference}</p>
      {authors && <div>{authors}</div>}
      {keywords && <p>{keywords}</p>}
    </li>
  })
  return <ul>{papersList}</ul>
}

function PapersList(text_file: string, title: string) {
  const [papers_info, setPapersInfo] = useState<ReadonlyPaperInfo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const papers_info_promise = ReadPapersInfo(text_file)
    papers_info_promise.then(result => {
      setPapersInfo(result)
    })
  }, [])

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h2>{title}</h2>
      <input type="text" onChange={onSearchChange} className={style.search_box} />
      <PapersListSub papers={papers_info} search_word={search}></PapersListSub>
    </>
  )
}

export function RayTracing() {
  const text_file = "ray_tracing.txt"
  const title = "Ray tracing papers"
  return PapersList(text_file, title)
}

export default function Papers() {
  return (
    <>
      <p>Papers</p>
      <Link to="ray_tracing">Ray Tracing</Link>
    </>
  )
}
