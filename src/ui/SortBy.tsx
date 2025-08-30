import { useSearchParams } from "react-router"
import Select from "./Select"

interface SortByProps {
    options: { value: string, label: string }[]
}

const SortBy = ({options}: SortByProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get('sortBy') || ''

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        searchParams.set('sortBy', event.target.value)
        setSearchParams(searchParams)
    }

    return (
        <Select options={options} type="white" onChange={handleChange} value={sortBy}>
            
        </Select>
    )
}

export default SortBy
