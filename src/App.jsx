import React from 'react'
import './index.css'

function App() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">TRK Impact — Tanger</h1>
        <p className="text-lg mb-6">
          Gestion immobilière haut de gamme à Tanger. Rendement, conciergerie et excellence locative.
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://wa.me/message/BWEN5LCAQK2HB1" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
            WhatsApp Direct
          </a>
          <a href="/DealDeck-TRK-Impact.pdf" 
             download
             onClick={()=>{
               try{ gtag('event','deal_deck_download') }catch(e){}
               try{ fbq('trackCustom','DealDeckDownload') }catch(e){}
             }}
             className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
            Télécharger le Deal Deck
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
