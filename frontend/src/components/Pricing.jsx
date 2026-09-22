import React from 'react'
import { seatSelectorHStyles } from '../assets/dummyStyles'
import { Ticket } from 'lucide-react'
import PropTypes from 'prop-types'

const Pricing = ({standardPaise, reclinerPaise}) => {
  return (
     <div className={seatSelectorHStyles.pricingContainer}>
                <h3 className={seatSelectorHStyles.pricingTitle}>
                  <Ticket size={18} />
                  Pricing
                </h3>
                <div className="space-y-3">
                  <div className={seatSelectorHStyles.pricingItem}>
                    <div className={seatSelectorHStyles.pricingRow}>
                      <span className={seatSelectorHStyles.pricingLabel}>
                        Standard
                      </span>
                      <span
                        className={seatSelectorHStyles.pricingValueStandard}
                      >
                        ₹{(standardPaise / 100).toFixed(2)}
                      </span>
                    </div>
                    <p className={seatSelectorHStyles.pricingNote}>
                      Rows A - C
                    </p>
                  </div>
                  <div className={seatSelectorHStyles.pricingItem}>
                    <div className={seatSelectorHStyles.pricingRow}>
                      <span className={seatSelectorHStyles.pricingLabel}>
                        Recliner
                      </span>
                      <span
                        className={seatSelectorHStyles.pricingValueRecliner}
                      >
                        ₹{(reclinerPaise / 100).toFixed(2)}
                      </span>
                    </div>
                    <p className={seatSelectorHStyles.pricingNote}>
                      Rows D - E
                    </p>
                  </div>
                </div>
              </div>
  )
}

Pricing.propTypes = {
    standardPaise: PropTypes.number.isRequired,
    reclinerPaise: PropTypes.number.isRequired,
}
export default Pricing
