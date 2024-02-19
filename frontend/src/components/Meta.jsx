import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Karaikudi E - Mart',
  description: 'We sell the best products for cheap',
  keywords: 'Murukku, Adhirasam, Seepu Seedai, kaimurukku, Manaholam, Sinna Seedai',
};

export default Meta;
