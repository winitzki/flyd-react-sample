import F from 'flyd'
import T from 'union-type'
import R from 'ramda'

// input stream

const UserClickT = T({ MakeCoffee: [], PushCommit: [], Restart: [] })

const input_stream = F.stream(UserClickT.Restart()) // values of type UserClickT

const coffee = () => input_stream(UserClickT.MakeCoffee())
const commit = () => input_stream(UserClickT.PushCommit())
const restart = () => input_stream(UserClickT.Restart())

// model

const init_model = { can_commit: false, uncommitted: 0, committed: 0 }

const make_new_model = (old_model, click) => UserClickT.case({
  PushCommit: () => ({
    can_commit: false,
    committed: old_model.committed + old_model.uncommitted,
    uncommitted: 0
  }),
  MakeCoffee: () => {
    const uncommitted = old_model.uncommitted + Math.round(Math.random() * 40)
    const can_commit = (uncommitted > 100)
    return { can_commit,
      committed: old_model.committed,
      uncommitted
    }
  },
  Restart: () => init_model,
}, click)

const model_stream = F.scan(make_new_model, init_model, input_stream)

module.exports = {
  model_stream,
  input_stream,
  coffee,
  commit,
  restart
}
