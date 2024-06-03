import { useState, useEffect } from 'react';
import { FilterPropsType, Party } from '../../types';

import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

export default function PartyFilter(props: FilterPropsType) {
    const [availableParties, setAvailableParties] = useState<Party[]>([])


    useEffect(() => {
        if (props.data.length > 0) {
            const parties = Array.from(new Set(props.data.map(
                row => {
                    if (row.VOLEBNI === undefined || row.VOLEBNI === null) {
                        return {
                            VSTRANA: "1",
                            NAZEVCELK: "Klub angažovaných nestraníků",
                            NAZEV_STRV: "Klub angažovaných nestraníků",
                            ZKRATKAV30: "Klub angažovaných nestraníků",
                            ZKRATKAV8: row.PRIJMENI,
                            SLOZENI: "040",
                            ZKRATKA_OF: "KAN",
                            TYPVS: "S",
                            PLNYNAZEV: ""
                        } as Party
                    }
                    return row.VOLEBNI
                })))
            setAvailableParties(parties)
        }
    }, [props.data])

    // const availableParties: (Party | null)[] = Array.from(new Set(props.data.map(row => row.VOLEBNI === null ? alert(row.PRIJMENI) : row.VOLEBNI))).sort((a: Party | null, b: Party | null) => a === null || b === null ? 0 : Number(a.VSTRANA) - Number(b.VSTRANA))


    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="partyFilter">Volební strany</Label>
            <div>Stran: {availableParties.length}</div>
            {availableParties.map((party, index) => {
                if (party === null) return null;
                return (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`party-${index}`} checked={props.view.parties.includes(party.VSTRANA)} />
                        <Label htmlFor={`party-${index}`}>{party.ZKRATKAV8}</Label>
                    </div>
                )
            })}

        </div>
    )

}