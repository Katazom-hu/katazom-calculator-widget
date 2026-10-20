/**
 * Katazom.hu – Beágyazható KATA Kalkulátor Widget
 *
 * Használat:
 * <div id="katazom-calculator"></div>
 * <script src="https://cdn.jsdelivr.net/npm/katazom-calculator-widget/widget.js"></script>
 * <script>
 *   KatazomWidget.init('#katazom-calculator');
 * </script>
 *
 * @author Katazom.hu <https://katazom.hu>
 * @license MIT
 */
(function (global) {
  'use strict';

  var KatazomWidget = {
    init: function (containerSelector, options) {
      var container = document.querySelector(containerSelector);
      if (!container) {
        console.warn('[KatazomWidget] Konténer elem nem található: ' + containerSelector);
        return;
      }

      options = options || {};
      var defaultRevenue = options.defaultRevenue || 1000000;
      var defaultMonths = options.defaultMonths || 12;

      container.classList.add('katazom-widget-container');
      container.innerHTML = `
        <div class="kz-card">
          <div class="kz-header">
            <div class="kz-title-badge">KATA 2026/2027</div>
            <h3 class="kz-title">Havi KATA Keret- & Adókalkulátor</h3>
            <p class="kz-subtitle">Számold ki az éves adóterheket és a kerettúllépés kockázatát másodpercek alatt.</p>
          </div>

          <div class="kz-body">
            <div class="kz-form-group">
              <label class="kz-label" for="kz-rev-input">Tervezett havi átlagos bevétel:</label>
              <div class="kz-input-wrapper">
                <input type="number" id="kz-rev-input" class="kz-input" value="${defaultRevenue}" step="50000" min="0" max="5000000">
                <span class="kz-input-addon">Ft / hó</span>
              </div>
            </div>

            <div class="kz-form-group">
              <div class="kz-label-split">
                <label class="kz-label" for="kz-months-input">Aktív hónapok száma az évben:</label>
                <span class="kz-badge-val" id="kz-months-val">${defaultMonths} hónap</span>
              </div>
              <input type="range" id="kz-months-input" class="kz-range" value="${defaultMonths}" min="1" max="12" step="1">
              <div class="kz-hint">Szüneteltetés esetén állítsd be az aktív hónapok számát.</div>
            </div>

            <div class="kz-progress-section">
              <div class="kz-label-split">
                <span class="kz-subtext">Keretkihasználtság:</span>
                <span class="kz-subtext-bold" id="kz-pct-val">0%</span>
              </div>
              <div class="kz-progress-track">
                <div class="kz-progress-bar" id="kz-progress-bar" style="width: 0%;"></div>
              </div>
            </div>

            <div class="kz-results-grid">
              <div class="kz-res-box">
                <div class="kz-res-label">Éves összes bevétel</div>
                <div class="kz-res-val" id="kz-total-rev">0 Ft</div>
              </div>
              <div class="kz-res-box">
                <div class="kz-res-label">Időarányos KATA keret</div>
                <div class="kz-res-val" id="kz-total-limit">0 Ft</div>
              </div>
              <div class="kz-res-box kz-highlight">
                <div class="kz-res-label">Fizetendő KATA adó (50k/hó)</div>
                <div class="kz-res-val" id="kz-kata-tax">0 Ft</div>
              </div>
              <div class="kz-res-box" id="kz-surtax-box">
                <div class="kz-res-label">40%-os különadó</div>
                <div class="kz-res-val" id="kz-surtax-val">0 Ft</div>
              </div>
            </div>

            <div class="kz-summary-box">
              <div class="kz-sum-row">
                <span>Becsült tiszta nettó jövedelem:</span>
                <span class="kz-net-val" id="kz-net-val">0 Ft</span>
              </div>
            </div>
          </div>

          <div class="kz-footer">
            <span>Powered by <a href="https://katazom.hu" target="_blank" rel="noopener" class="kz-brand-link">Katazom.hu</a> – Valós idejű NAV számlaszinkron & ÁFA hibafigyelő</span>
            <div class="kz-links">
              <a href="https://katazom.hu/#kalkulator" target="_blank" rel="noopener">Részletes Kalkulátor</a> •
              <a href="https://ingyenkata.hu" target="_blank" rel="noopener">IngyenKATA.hu</a> •
              <a href="https://katazom.hu/tudastar" target="_blank" rel="noopener">KATA Tudástár</a>
            </div>
          </div>
        </div>
      `;

      var revInput = container.querySelector('#kz-rev-input');
      var monthsInput = container.querySelector('#kz-months-input');
      var monthsVal = container.querySelector('#kz-months-val');
      var pctVal = container.querySelector('#kz-pct-val');
      var progressBar = container.querySelector('#kz-progress-bar');
      var totalRev = container.querySelector('#kz-total-rev');
      var totalLimit = container.querySelector('#kz-total-limit');
      var kataTax = container.querySelector('#kz-kata-tax');
      var surtaxBox = container.querySelector('#kz-surtax-box');
      var surtaxVal = container.querySelector('#kz-surtax-val');
      var netVal = container.querySelector('#kz-net-val');

      function formatHuf(num) {
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
      }

      function recalculate() {
        var monthlyRev = parseFloat(revInput.value) || 0;
        var months = parseInt(monthsInput.value, 10) || 12;

        monthsVal.textContent = months + ' hónap';

        var annualRev = monthlyRev * months;
        var limit = months * 1500000;
        var pct = limit > 0 ? (annualRev / limit) * 100 : 0;

        totalRev.textContent = formatHuf(annualRev);
        totalLimit.textContent = formatHuf(limit);

        var clampedPct = Math.min(100, Math.max(0, pct));
        pctVal.textContent = Math.round(pct) + '%';
        progressBar.style.width = clampedPct + '%';

        if (pct > 100) {
          progressBar.style.backgroundColor = '#ef4444';
          pctVal.style.color = '#ef4444';
        } else if (pct > 80) {
          progressBar.style.backgroundColor = '#f59e0b';
          pctVal.style.color = '#f59e0b';
        } else {
          progressBar.style.backgroundColor = '#10b981';
          pctVal.style.color = '#10b981';
        }

        var fixedTax = months * 50000;
        kataTax.textContent = formatHuf(fixedTax);

        var surtax = 0;
        if (annualRev > limit) {
          surtax = (annualRev - limit) * 0.40;
          surtaxBox.classList.add('kz-alert-danger');
        } else {
          surtaxBox.classList.remove('kz-alert-danger');
        }
        surtaxVal.textContent = formatHuf(surtax);

        // Becsült sávos HIPA (ha > 0 hó és nem 0 bevétel, átlagosan 50k vagy arányos)
        var hipa = annualRev > 0 ? 50000 : 0;
        var totalTaxes = fixedTax + surtax + hipa;
        var netIncome = Math.max(0, annualRev - totalTaxes);

        netVal.textContent = formatHuf(netIncome);
      }

      revInput.addEventListener('input', recalculate);
      monthsInput.addEventListener('input', recalculate);

      recalculate();
    }
  };

  // Automatikus inicializáció ha van elem
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      var autoEl = document.querySelector('[data-katazom-widget]');
      if (autoEl) {
        KatazomWidget.init(autoEl);
      }
    });
  }

  global.KatazomWidget = KatazomWidget;
})(typeof window !== 'undefined' ? window : this);
