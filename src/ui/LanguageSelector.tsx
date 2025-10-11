import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "ja", name: "日本語" },
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <StyledSelect value={i18n.language} onChange={handleChange}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default LanguageSelector;