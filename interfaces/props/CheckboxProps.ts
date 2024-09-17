export interface SetFilters {
    aSite: boolean;
    bSite: boolean;
    cSite: boolean;
    middle: boolean;
    attack: boolean;
    defense: boolean;
}

export interface CheckboxProps {
    text: string;
    filters: SetFilters
    setFilters: React.Dispatch<React.SetStateAction<SetFilters>>
    property: 'aSite' | 'bSite' | 'cSite' | 'middle' | 'attack' | 'defense';
}