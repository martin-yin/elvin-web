import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { userInteractor } from '../../../core/interactors'
import { UserIF } from '../../../interface'

const useUserInit = () => {
  const [behaviorTraces, setBehaviorTraces] = useState({
    total: 0,
    list: []
  })
  const [behavioStatistics, setBehavioStatistics] = useState<UserIF.UserActionStatistics>()
  const [behavioDetail, setBehavioDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')
  const [sessionSurvey, setSessionSurvey] = useState<UserIF.User>()
  const params = useParams<'user_id' | 'session_id'>()

  const initSessionBehaviorTrace = useCallback(async page => {
    const { total, user_actions_list } = await userInteractor.getUserActions({
      session_id: params.session_id,
      page: page,
      limit: 3
    })
    setBehaviorTraces({
      total: total,
      list: user_actions_list
    })
  }, [])

  const handleActiveBehavior = async item => {
    setActiveId(`${item.happen_time}${item.action_type}`)
    setBehavioDetail(item.action_detail)
  }
  useEffect(() => {
    ;(async () => {
      const user = await userInteractor.getUser(params.user_id)
      const actionsStatistics = await userInteractor.getUserActionStatistics<UserIF.UserActionStatistics>({
        session_id: params.session_id
      })
      setSessionSurvey(user)
      setBehavioStatistics(actionsStatistics)
    })()
  }, [params])

  useEffect(() => {
    initSessionBehaviorTrace(1)
  }, [])

  const onPageChange = useCallback(async (page: number) => {
    setBehaviorTraces({
      ...behaviorTraces
    })
    initSessionBehaviorTrace(page)
  }, [])

  return {
    behaviorTraces,
    sessionSurvey,
    activeId,
    behavioStatistics,
    behavioDetail,
    handleActiveBehavior,
    onPageChange
  }
}

export default useUserInit
