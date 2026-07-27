import React from 'react';
import Image from 'next/image';

interface SpecItem {
  name: string;
  value: string;
}

interface ProSlimDetailProps {
  title: string;
  images: {
    front: string;
    back: string;
    side: string;
    top: string;
    zoom: string;
  };
  specs: SpecItem[];
  brochureUrl: string;
}

export const ProSlimDetail: React.FC<ProSlimDetailProps> = ({ title, images, specs, brochureUrl }) => {
  return (
    <section className="pro-slim-detail">
      <h1 className="title">{title}</h1>
      <div className="grid">
        {/* Image Gallery */}
        <div className="gallery">
          <Image src={images.front} alt={`${title} front`} width={600} height={400} priority />
          <div className="thumbs">
            <Image src={images.back} alt="Back view" width={150} height={100} />
            <Image src={images.side} alt="Side view" width={150} height={100} />
            <Image src={images.top} alt="Top view" width={150} height={100} />
            <Image src={images.zoom} alt="Zoom view" width={150} height={100} />
          </div>
        </div>
        {/* Specifications */}
        <div className="specs">
          <h2>Specifications</h2>
          <ul>
            {specs.map((s, idx) => (
              <li key={idx}>
                <strong>{s.name}:</strong> {s.value}
              </li>
            ))}
          </ul>
          <a href={brochureUrl} className="brochure" download>
            Download Brochure
          </a>
        </div>
      </div>
      <style jsx>{`
        .pro-slim-detail {
          padding: 2rem;
        }
        .title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .gallery {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .thumbs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
          justify-content: center;
        }
        .specs ul {
          list-style: none;
          padding: 0;
        }
        .specs li {
          margin-bottom: 0.5rem;
        }
        .brochure {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #0066ff;
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
