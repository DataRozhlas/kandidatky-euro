export type View = {
    years: string[]
    poradi: [number, number]
}

export type FilterPropsType = {
    view: View;
    setView: React.Dispatch<React.SetStateAction<{ years: string[], poradi: [number, number]; }>>;
    data: Candidate[];
}

export type Party = {
    VSTRANA: string,
    NAZEVCELK: string,
    NAZEV_STRV: string,
    ZKRATKAV30: string,
    ZKRATKAV8: string,
    POCTR_SLO: string,
    SLOZENI: string,
    ZKRATKA_OF: string,
    TYPVS: string,
    PLNYNAZEV: string,
}

export type Candidate = {
    ESTRANA: string,
    PORCISLO: string,
    JMENO: string,
    PRIJMENI: string,
    TITULPRED: string,
    TITULZA: string,
    VEK: string,
    STATOBCAN: string,
    POVOLANI: string,
    BYDLISTEN: string,
    BYDLISTEK: string,
    PSTRANA: string,
    NSTRANA: string,
    PLATNOST: string,
    POCHLASU: string,
    POCPROC: string,
    MANDAT: string,
    PORADIMAND: string,
    PORADINAHR: string,
    POHLAVI: string,
    ROK: string,
    VSTRANA: string,
    NAVRHUJICI: Party | null,
    VOLEBNI: Party | null,
    PRISLUSNOST: Party | null,
}


