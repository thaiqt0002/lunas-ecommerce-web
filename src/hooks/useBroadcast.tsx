import { useCallback, useEffect } from 'react'

interface IChannel {
  channel: string
  callback: (data: any) => void
}
const useBroadcast = ({ channel, callback }: IChannel) => {
  const listener = useCallback(() => {
    const bc = new BroadcastChannel(channel)
    bc.onmessage = ({ data }) => callback(data)
  }, [channel, callback])

  useEffect(() => {
    listener()
  }, [listener])
}
export default useBroadcast
