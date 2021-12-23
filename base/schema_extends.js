
const base_schema = {
    state: {
        is_active: {type: Boolean, default: true},
        created_at: {type: Date},
        updated_at: {type: Date},
    },
}

const base_pre_save = (schema, create_act, update_act) => {
    const _now = Date.now()
    schema.state.updated_at = _now
    if (typeof update_act === 'function') {
        update_act()
    }
    if(!schema.state.created_at){
        if (typeof update_act === 'function') {
            create_act()
        }
        schema.state.created_at = _now
    }
}

module.exports = {
    base_schema,
    base_pre_save,
}