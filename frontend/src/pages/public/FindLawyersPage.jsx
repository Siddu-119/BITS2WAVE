import SectionHeading from '../../components/common/SectionHeading'
import LawyerDirectory from '../../components/lawyers/LawyerDirectory'

export default function FindLawyersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <SectionHeading
        eyebrow="Find lawyers"
        title="Search verified local counsel"
        description="Results come from the lawyer directory. Verification status is shown on every card."
      />
      <div className="mt-8">
        <LawyerDirectory getProfilePath={(id) => `/lawyers/${id}`} />
      </div>
    </div>
  )
}
