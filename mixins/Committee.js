export default {
    methods: {
        _needsToAcceptAssignment(committeeMember) {
            if (committeeMember)
            {
                return (["Y", "R", "C"].indexOf(committeeMember.approvedStatus) >= 0 && (committeeMember.dateTimeAccepted === null))
            }
            return false
        },
        _approvalNeeded(committeeMember) {
            if (committeeMember)
            {
                return (committeeMember.approvedStatus !== "Y")
            }
            return false
        },
        _thesisApprovalNeeded(committeeMember) {
            if (committeeMember)
            {
                return ((committeeMember.approvedStatus === "Y") && (committeeMember.dateTimeApprovedThesis === null))
            }
            return false
        },
        _planApprovalNeeded(committeeMember) {
            if (committeeMember)
            {
                return ((committeeMember.approvedStatus === "Y") && (committeeMember.dateTimeApprovedPlan === null))
            }
            return false
        },
        _allowResend(committeeMember) {
            if (committeeMember)
            {
                if (committeeMember.dateTimeAccepted === null)
                {
                    if (committeeMember.dateTimeInvited === null)
                    {
                        return true
                    }
                    const dateInvited = new Date(committeeMember.dateTimeInvited)
                    const now = new Date()
                    const timeDiff = Math.abs(now.getTime() - dateInvited.getTime());
                    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    return (diffDays > 5)
                }
            }
            return false
        }
    }
}