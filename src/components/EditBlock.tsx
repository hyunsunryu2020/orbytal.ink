import React, { ReactNode, useEffect, useState } from 'react'
import { FaDiscord, FaFacebook, FaInstagram, FaQuestionCircle, FaSortDown, FaTwitch, FaTwitter, FaYarn } from 'react-icons/fa'
import BlockTypeEnum from '../models/BlockTypeEnum'

export type BlockType = {
  val: BlockTypeEnum
  label: string
  icon: ReactNode
}

export const blockTypes: BlockType[] = [
  {
    val: BlockTypeEnum.Twitter,
    label: "Twitter",
    icon: <FaTwitter />
  },
  {
    val: BlockTypeEnum.Threads,
    label: "Threads",
    icon: <FaYarn />
  },
  {
    val: BlockTypeEnum.Facebook,
    label: "Facebook",
    icon: <FaFacebook />
  },
  {
    val: BlockTypeEnum.Instagram,
    label: "Instagram",
    icon: <FaInstagram />
  },
  {
    val: BlockTypeEnum.Twitch,
    label: "Twitch",
    icon: <FaTwitch />
  },
  {
    val: BlockTypeEnum.Discord,
    label: "Discord",
    icon: <FaDiscord/>
  },
  {
    val: BlockTypeEnum.Custom,
    label: "Custom",
    icon: <FaQuestionCircle />
  },
]

type BTDProps = {
  onChange: (type: BlockType) => void
}

function BlockTypeDropdown({ onChange }: BTDProps) {
  return (
    <div className="absolute mt-[42px] bg-white flex flex-col shadow-lg rounded gap-2 min-w-[200px]">
      {blockTypes.map(t => (
        <button key={`btbutton-${t.val}`} onClick={() => onChange(t)} className="flex gap-2 p-2 items-center hover:bg-gray-200">
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  )
}

type Props = {
  block: any
  onUpdated: (id?: number, block_key?: number, blockType?: BlockTypeEnum, label?: string, url?: string) => void
}

function EditBlock({ block, onUpdated }: Props) {
  const [blockType, setBlockType] = useState<BlockType>()
  const [label, setLabel] = useState<string>()
  const [url, setUrl] = useState<string>();
  const [id, setId] = useState<number>();
  const [blockKey, setBlockKey] = useState<number>();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setId(block.id)
    setUrl(block.url)
    setBlockKey(block.block_key)
    const bt = blockTypes.find(el => el.val === block.block_type)
    setBlockType(bt)
    setLabel(block.label)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onUpdated(id, blockKey, blockType?.val, label, url)
    }, 500)

    return () => clearTimeout(timeout)
  }, [id, blockType, label, url])

  function onBlockTypeChanged(type: BlockType) {
    setBlockType(type)
    setShowDropdown(false)
  } 

  return (
    <div className="text-left p-4 bg-slate-200 transition-all rounded-lg flex flex-col gap-1 mb-2">
      <div className="flex items-center gap-2 rounded bg-white mb-2">
        <button onClick={() => setShowDropdown(true)} className="flex items-center justify-center align-center p-3 bg-slate-100 border-r border-slate-200 rounded-l">
          <FaSortDown className="pr-2"/> {blockType?.icon}
        </button>
        <input 
          className="p-2 disabled:text-gray-500 disabled:italic disabled:cursor-not-allowed" 
          value={blockType?.val !== 999 ? blockType?.label : label} 
          onChange={e => setLabel(e.target.value)}
          disabled={blockType?.val !== 999} />
      </div>
      {showDropdown && <BlockTypeDropdown onChange={onBlockTypeChanged} /> }

      <input className="rounded bg-white p-2" value={url} onChange={e => setUrl(e.target.value)} placeholder='Username' />
    </div>
  )
}

export default EditBlock