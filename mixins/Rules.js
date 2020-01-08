export default {
    methods: {
        _signatureRule(signature) {
            return {specification: "Signature", value: signature}
        },
        _documentRule(document) {
            return {specification: "Document", value: document}
        },
        _countingRule(numberOf, scope) {
            return {specification: "Counting", value: numberOf, scope: scope}
        },
        _committeeRule(comittee, scope, numberOf) {
            return {specification: "Committee", value: comittee, countingRule: {scope: scope, value: numberOf}}
        },
        _extractRules(requirement, specification, scope)
        {
            const rules = []
            if (requirement)
            {
                requirement.rules = requirement.rules || []
                for (const rule of requirement.rules)
                {
                    if (rule.specification === specification)
                    {
                        if (scope)
                        {
                            if (scope === rule.scope)
                            {
                                rules.push(rule)
                            }
                        }
                        else
                        {
                            rules.push(rule)
                        }
                    }
                }
            }

            return rules
        },
        _rules_countingRule(rules, scope)
        {
            if (rules)
            {
                for (const rule of rules)
                {
                    if (rule.specification === "Counting")
                    {
                        if (scope === rule.scope)
                        {
                            return rule
                        }
                    }
                }
            }

            return null
        },
        _rules_signaturesText(rule, signatures) {
            if (!signatures || signatures.length < 1)
            {
                return "Signatures"
            }
            if (signatures.length === 1)
            {
                return "1 Signature is required"
            }
            if ((!rule) || (rule.value === signatures.length))
            {
                return signatures.length + " Signatures are required"
            }
            return rule.value + " of " + signatures.length + " possible Signatures are required"
        },
        _rules_documentsText(rule, documents) {
            if (!documents || documents.length < 1)
            {
                return "Documents"
            }
            if (documents.length === 1)
            {
                return "Upload 1 Document"
            }
            if ((!rule) || (rule.value === documents.length))
            {
                return "Upload " + documents.length + " Documents"
            }
            return "Upload " + rule.value + " of " + documents.length + " possible Documents"
        },
        _rules_childRequirementsText(rule, childRequirements) {
            if (!childRequirements || childRequirements.length < 1)
            {
                return "Options"
            }
            if (childRequirements.length === 1)
            {
                return ""
            }
            if ((!rule) || (rule.value === childRequirements.length))
            {
                return "Complete the following"
            }
            return "Complete " + rule.value + " of " + childRequirements.length + " possible options"
        },
        _rules_remove(requirement, instance, specification)
        {
            requirement.rules = requirement.rules || []
            let index = 0
            let foundAt = 0
            let found = false
            for (const rule of requirement.rules)
            {
                if (rule.specification === specification)
                {
                    if (foundAt === instance)
                    {
                        found = true
                        break
                    }
                    foundAt += 1
                }
                index += 1
            }

            if (found)
            {
                requirement.rules.splice(index, 1)
            }
        },
        _rules_countingRuleSet(requirement, scope, value)
        {
            requirement.rules = requirement.rules || []
            for (const rule of requirement.rules)
            {
                if (rule.specification === "Counting")
                {
                    if (rule.scope === scope)
                    {
                        rule.value = value
                        return
                    }
                }
            }
            console.log("Pushing counting rules on ", requirement.id, scope, value)
            requirement.rules.push(this._countingRule(value, scope))
            console.log("requirement", requirement)
        }
    }
}