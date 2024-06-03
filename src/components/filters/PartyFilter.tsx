import { useEffect } from 'react';
import { FilterPropsType, Party } from '../../types';

import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
// import { Badge } from "@/components/ui/badge";
import { Button } from '../ui/button';

export default function PartyFilter(props: FilterPropsType) {

    const availableParties: (Party | null)[] = Array.from(new Set(props.data.map(row => row.VOLEBNI))).sort((a: Party | null, b: Party | null) => a === null || b === null ? 0 : Number(a.VSTRANA) - Number(b.VSTRANA))


    const handleCheckedChange = (value: string) => {
        props.setView((prev) => {
            let newParties = [...prev.parties];
            const index = newParties.indexOf(value);
            if (index === -1) {
                newParties.push(value)
            } else {
                newParties.splice(index, 1)
            }
            return {
                ...prev,
                parties: newParties,
                partiesHasChanged: true
            }
        })
    }

    useEffect(() => {
        if (!props.view.partiesHasChanged) {
            props.setView((prev) => {
                return {
                    ...prev,
                    parties: availableParties.map(party => party === null ? "" : party.VSTRANA)
                }
            })
        }
    }, [props.data])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
                <Label htmlFor="partyFilter">Volební strany</Label>
                {/* <Badge variant={"secondary"} className={""}>{`${props.view.parties.length} z ${availableParties.length}`}</Badge> */}
                <Button variant={"link"} size={"sm"} className={""} onClick={() => props.setView((prev) => {
                    return {
                        ...prev,
                        parties: availableParties.map(party => party === null ? "" : party.VSTRANA),
                        partiesHasChanged: true
                    }
                })}>vybrat vše</Button>
            </div>
            <div id="partyFilter" className="flex flex-col gap-1">
                {availableParties.map((party, index) => {
                    if (party === null) return null;
                    return (
                        <div key={index} className="flex items-center space-x-1">
                            <Checkbox id={party.VSTRANA} value={party.VSTRANA} checked={props.view.parties.includes(party.VSTRANA)} onCheckedChange={() => handleCheckedChange(party.VSTRANA)} />
                            <Label htmlFor={party.VSTRANA} className={"text-xs cursor-pointer"}>{party.ZKRATKAV30}</Label>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}