import { FaTwitter } from "react-icons/fa"
import BlockTypeEnum from "../models/BlockTypeEnum"
import { BlockType, blockTypes } from "./EditBlock"
import { useEffect, useState } from "react"

type Params = {
  type: BlockTypeEnum,
  url: string
}

function Block({ type, url }: Params) {
  const [blockType, setBlockType] = useState<BlockType>()

  useEffect(() => {
    const bt = blockTypes.find(el => el.val === type)
    setBlockType(bt)
  }, [type])

  function openUrl() {  
    let theUrl = ""
    if(type === BlockTypeEnum.Twitter) {
      theUrl = `https://twitter.com/${url}`
    }
    if(type === BlockTypeEnum.Threads) {
      theUrl = `https://threads.net/@${url}`
    }
    if(type === BlockTypeEnum.Discord) {
      theUrl = url
    }
    window.open(theUrl, '_blank')
  }

  return (
    <button onClick={() => openUrl()} 
      className="text-left p-4 bg-slate-200 hover:bg-slate-300 transition-all rounded-lg flex items-center gap-1">
      { blockType?.icon} {url}
    </button>
  )
}

export default Block