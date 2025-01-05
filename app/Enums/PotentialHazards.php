<?php

namespace App\Enums;

enum PotentialHazards: string
{
    case BIOLOGICAL = 'BioLogical';
    case PHYSICAL = 'Physical';
    case CHEMICALS = 'Chemicals';
    case ALLERGENS = 'Allergens';
    case NUTRITIONAL = 'Nutritional';
    case RADIATION = 'Radiation';
    case VULNERABILITY = 'Vulnerability';
    case TERRORISM = 'Terrorism';

    public static function types_of_hazards(): array
    {
        return [
            self::BIOLOGICAL->value,
            self::PHYSICAL->value,
            self::CHEMICALS->value,
            self::ALLERGENS->value,
            self::NUTRITIONAL->value,
            self::RADIATION->value,
            self::VULNERABILITY->value,
            self::TERRORISM->value,
        ];
    }

    public static function likelihood_is_rare(): array
    {
        return [
            'description' => 'Likelihood is Rare',
            'code' => '12345',
            'details' => 'When estimating the likely occurrence, you should consider information from several sources, such as the following: data from outbreaks of foodborne illness, data from recalls, information in the scientific literature, and experience and historical information gathered by your location. The likelihood of a hazard is assessed using the following scale:',
            'scale' => [
                [
                    'level' => 1,
                    'name' => 'Rare',
                    'description' => 'May occur only in exceptional circumstances. There is a next step in the process which will eliminate or reduce the hazard to an acceptable level (e.g., cooking, pasteurisation, fermentation); Theoretical chance – the hazard never occurred before.',
                ],
                [
                    'level' => 2,
                    'name' => 'Unlikely',
                    'description' => 'Could occur at some time. It is a very limited and/or local contamination. The control measure or the hazard are of such a nature that when the control measure is failing, no production is possible anymore or no useful end products are produced (e.g., too high a concentration of colorants as additives).',
                ],
                [
                    'level' => 3,
                    'name' => 'Possible',
                    'description' => 'Might occur at some point in time. The control measures for the hazard are of a general nature (PRPs) and these are well implemented in practice; The probability that due to failing or absence of the PRPs, the hazard will occur in the end product is very limited.',
                ],
                [
                    'level' => 4,
                    'name' => 'Likely',
                    'description' => 'Will probably occur in most circumstances. Failing or lacking of the specific control measure does not result in the systematic presence of the hazard in the end product, but the hazard can be present in a certain percentage of the end product in the associated batch.',
                ],
                [
                    'level' => 5,
                    'name' => 'Almost certain',
                    'description' => 'Is expected to occur in most circumstances. Failure or absence of the specific control measure will result in a systematic error, and there is a high probability that the hazard is present in all end products of the associated batch.',
                ],
            ],
        ];
    }

    public static function severity_is_insignificant(): array
    {
        return [
            'description' => 'Severity is Insignificant',
            'code' => '12345',
            'details' => 'The severity of a hazard is assessed using the following scale:',
            'scale' => [
                [
                    'level' => 1,
                    'name' => 'Insignificant',
                    'description' => 'HEALTH: Insignificant impact. There is no problem for the consumer related to food safety (nature of hazard e.g. paper, soft plastic, large size foreign materials); The hazard can never reach a dangerous concentration (e.g. colorants, S. aureus in a frozen food where multiplication to higher counts is highly unlikely or cannot happen because of storage conditions and cooking). OPERATIONAL: Little disruption to normal operation. COST: Low increase in normal costs.',
                ],
                [
                    'level' => 2,
                    'name' => 'Minor',
                    'description' => 'HEALTH: Minor impact for small population. No serious injuries and/or symptoms or only when exposed to an extremely high concentration during a long period of time; A temporary but clear effect on health (e.g. small pieces). OPERATIONAL: Some manageable operation disruption. COST: Some increase in operating costs.',
                ],
                [
                    'level' => 3,
                    'name' => 'Moderate',
                    'description' => 'HEALTH: Minor impact for large population. OPERATIONAL: Significant modification to normal operation but manageable. COST: Operation costs increased.',
                ],
                [
                    'level' => 4,
                    'name' => 'Major',
                    'description' => 'HEALTH: Major impact for small population. A clear effect on health with short-term or long-term symptoms which results rarely in mortality (e.g. gastro-enteritis); The hazard has a long-term effect; the maximal dose is not known (e.g. dioxins, residues of pesticides, mycotoxins). OPERATIONAL: Systems significantly compromised and abnormal operation, if at all. COST: Systems significantly compromised and abnormal operation, if at all.',
                ],
                [
                    'level' => 5,
                    'name' => 'Catastrophic',
                    'description' => 'HEALTH: Major impact for large population. Deadly or permanent impact for health. The consumer group belongs to a risk category and the hazard can result in mortality; The hazard results in serious symptoms from which mortality may result; Permanent injuries. OPERATIONAL: Complete failure of systems. COST: Complete failure of systems.',
                ],
            ],
        ];
    }

    public static function risk_level_of_hazards(): array
    {
        return [

            'MOD' => 'Under Modification',
            'PRP' => 'Prerequisite Program',
            'CP' => 'Control Point',
            'OPRP' => 'Operational Prerequisite Program',
            'CCP' => 'Critical Control Point',
        ];
    }
}
