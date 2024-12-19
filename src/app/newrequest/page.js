'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import styles from '@/styles/RequestForm.module.css'

export default function NewRequest() {
    const { user } = useAuth()
    const router = useRouter()

    // Handle loading state
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        date: '',
        description: '',
        receipts: [],
        travelDetails: {
            tripType: '',
            domesticInternational: '',
            departureDate: '',
            arrivalDate: '',
            modeOfTransport: '',
            purposeOfVisit: '',
        },
        mealDetails: {
            mealDate: '',
            mealAmount: '',
        },
        accommodationDetails: {
            accommodationAmount: '',
            accommodationDate: '',
        }
    });

    useEffect(() => {
        // Set loading state to false after checking user
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Being Submitted:', formData); // Debug log
        // Handle form submission here (e.g., API call)
    }

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setFormData({ 
            ...formData, 
            type: newType,
            travelDetails: newType === 'travel' ? formData.travelDetails : {}, // Keep travel data if type is not changed to meals
            mealDetails: newType === 'meals' ? formData.mealDetails : {}, // Keep meal data if type is not changed to travel
            accommodationDetails: newType === 'accommodation' ? formData.accommodationDetails : {}, // Keep accommodation data
        });
    }

    // Show loading state while verifying authentication
    if (isLoading) {
        return <p>Loading...</p>; // Show a spinner or placeholder while verifying authentication
    }

    return (
        <div className={styles.container}>
            <h1>New Reimbursement Request</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Expense Type</label>
                    <select value={formData.type} onChange={handleTypeChange}>
                        <option value="">Select type</option>
                        <option value="travel">Travel</option>
                        <option value="meals">Meals</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Dynamic fields based on expense type */}
                {formData.type === 'travel' && (
                    <>
                        <h2>Travel Details</h2>
                        <div className={styles.travelDetails}>
                            <div className={styles.formGroup}>
                                <label>Trip Type</label>
                                <select
                                    value={formData.travelDetails.tripType}
                                    onChange={(e) => setFormData({ ...formData, travelDetails: { ...formData.travelDetails, tripType: e.target.value } })}
                                >
                                    <option value="">Select trip type</option>
                                    <option value="business">Business</option>
                                    <option value="personal">Personal</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Domestic or International</label>
                                <select
                                    value={formData.travelDetails.domesticInternational}
                                    onChange={(e) => setFormData({ ...formData, travelDetails: { ...formData.travelDetails, domesticInternational: e.target.value } })}
                                >
                                    <option value="">Select</option>
                                    <option value="domestic">Domestic</option>
                                    <option value="international">International</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Departure Date</label>
                                <input
                                    type="date"
                                    value={formData.travelDetails.departureDate}
                                    onChange={(e) => setFormData({ ...formData, travelDetails: { ...formData.travelDetails, departureDate: e.target.value } })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Arrival Date</label>
                                <input
                                    type="date"
                                    value={formData.travelDetails.arrivalDate}
                                    onChange={(e) => setFormData({ ...formData, travelDetails: { ...formData.travelDetails, arrivalDate: e.target.value } })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Mode of Transport</label>
                                <input
                                    type="text"
                                    value={formData.travelDetails.modeOfTransport}
                                    onChange={(e) => setFormData({ ...formData, travelDetails: { ...formData.travelDetails, modeOfTransport: e.target.value } })}
                                    placeholder="Enter mode of transport" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Purpose of Visit</label>
                                <textarea
                                    value={formData.travelDetails.purposeOfVisit}
                                    onChange={(e) => setFormData({ ...formData, travelDetails: { ...formData.travelDetails, purposeOfVisit: e.target.value } })}
                                    placeholder="Enter purpose of visit" />
                            </div>
                        </div>
                    </>
                )}

                {formData.type === 'meals' && (
                    <div className={styles.mealDetails}>
                        <h2>Meal Details</h2>
                        <div className={styles.formGroup}>
                            <label>Meal Date</label>
                            <input
                                type="date"
                                value={formData.mealDetails.mealDate}
                                onChange={(e) => setFormData({ ...formData, mealDetails: { ...formData.mealDetails, mealDate: e.target.value } })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Meal Amount</label>
                            <input
                                type="number"
                                value={formData.mealDetails.mealAmount}
                                onChange={(e) => setFormData({ ...formData, mealDetails: { ...formData.mealDetails, mealAmount: e.target.value } })}
                                placeholder="Enter meal amount"
                            />
                        </div>
                    </div>
                )}

                {formData.type === 'accommodation' && (
                    <div className={styles.accommodationDetails}>
                        <h2>Accommodation Details</h2>
                        <div className={styles.formGroup}>
                            <label>Accommodation Amount</label>
                            <input
                                type="number"
                                value={formData.accommodationDetails.accommodationAmount}
                                onChange={(e) => setFormData({ ...formData, accommodationDetails: { ...formData.accommodationDetails, accommodationAmount: e.target.value } })}
                                placeholder="Enter accommodation amount"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Accommodation Date</label>
                            <input
                                type="date"
                                value={formData.accommodationDetails.accommodationDate}
                                onChange={(e) => setFormData({ ...formData, accommodationDetails: { ...formData.accommodationDetails, accommodationDate: e.target.value } })}
                            />
                        </div>
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label>Receipts</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setFormData({ ...formData, receipts: Array.from(e.target.files) })}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Request
                </button>
            </form>
        </div>
    )
}
