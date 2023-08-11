/* eslint-disable @typescript-eslint/ban-types */
import { FaPlus, FaTimes } from 'react-icons/fa'
import { useProfileStore } from '../store'
import { useEffect, useState } from 'react'
import EditBlock from './EditBlock'
import BlockTypeEnum from '../models/BlockTypeEnum'

type Props = {
  onBackgroundClicked?: () => void
  onCloseClicked?: () => void
  hideCloseButton?: boolean
}

function EditProfileForm({ onBackgroundClicked, hideCloseButton, onCloseClicked }: Props) {
  const { isLoaded, profile } = useProfileStore((state) => state)
  const [tagline, setTagline] = useState<string>()
  // TODO: dont use any
  const [blocks, setBlocks] = useState<any[]>([])

  useEffect(() => {
    if(!isLoaded) false
    setTagline(profile.tagline)
    setBlocks(profile.blocks)
  }, [isLoaded, profile])

  async function onSubmit() {
    const res = await fetch("/.netlify/functions/me", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tagline,
        blocks
      })
    })
    if(res.status === 200) {
      location.assign("/me")
    }
  }

  function addBlock(): void {
    setBlocks([...blocks, {
      block_key: Date.now(),
      block_type: 1,
      label: "",
      url: ""
    }])
  }

  function onBlockUpdated(id?: number, block_key?: number, block_type?: BlockTypeEnum, label?: string, url?: string) {
    const _blocks = blocks
    let old;
    if(id) {
      old = _blocks.find(el => el.id === id)
    } else if (block_key) {
      old = _blocks.find(el => el.block_key === block_key)
    }
    if(old) {
      const idx = blocks.indexOf(old)
      _blocks[idx] = {
        block_key,
        block_type,
        label,
        url,
        id,
      }
      setBlocks(_blocks)
    }
  }

  function _onBackgroundClicked() {
    if(onBackgroundClicked) onBackgroundClicked()
  }

  function _onCloseClicked() {
    if(onCloseClicked) onCloseClicked()
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 grid justify-center items-center">
      <div onClick={() => _onBackgroundClicked()} className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900/90 z-[100]"/>
      <div className="relative rounded shadow-sm w-screen sm:w-[50vw] sm:max-w-[800px] h-screen sm:h-auto bg-slate-100 z-[1000]" >
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center rounded-t">
          <div className="text-lg">Edit profile</div>
          {!hideCloseButton && <div className="hover:cursor-pointer text-lg" onClick={() => _onCloseClicked()}><FaTimes /></div>}
        </div>
        <div className="py-2 px-4">
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-slate-800" >
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="Tagline"
              className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-slate-700 outline-none focus:border-slate-300 focus:shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-3 block text-base font-medium text-slate-800" >
              Blocks
            </label>
            {isLoaded && blocks.map((b: any) => (
              <EditBlock key={`editblock-${b.id ? b.id : b.key}`} block={b} onUpdated={onBlockUpdated} />
            ))}
            <button className="text-left p-4 bg-slate-200 transition-all rounded-lg flex items-center gap-2" onClick={addBlock}><FaPlus /> New block</button>
          </div>
        </div>
        <div className="flex py-2 px-4">
          <button className="p-2 bg-slate-200 hover:bg-slate-300 hover:shadow-sm transition-all rounded" onClick={onSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm