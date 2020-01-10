
export default {
    methods: {
        _getFullYBYUEDUURL(uri, useStageModifier) {
            let url = "https://y"
            if (useStageModifier)
            {
                url += "-stg"
            }
            url += ".byu.edu/ry/ae/prod/"
            url += uri

            return url
        },
        _getUseStageModifer(stageId) {
            return (window.location.hostname.includes(stageId))
        }
    }
}