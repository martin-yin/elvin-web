import { useEffect } from 'react'
import { projectInteractor } from '../../core/interactors'
import { setMonitorId, setMonitorIdAndProject } from '../../stores/app.store'
import { useHookTools } from '../../utils/useHookTools'

export const useNavMenuInit = projects => {
  // 这个hook 需要其他的hook，就需要去调用
  const { navigate, storeDispatch } = useHookTools()

  useEffect(() => {
    ;(async () => {
      if (projects.length === 0) {
        const { monitor_id, projects } = await projectInteractor.getProjects()
        storeDispatch(
          setMonitorIdAndProject({
            monitor_id,
            projects
          })
        )
      }
    })()
  }, [])

  const setActiveMonitorId = (value: string) => {
    storeDispatch(setMonitorId(value))
    navigate('/user')
  }

  return setActiveMonitorId
}
