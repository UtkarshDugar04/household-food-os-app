import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Trash2, Crown } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import { userProfile } from '../../data/mockData';

export default function HouseholdProfile() {
  const navigate = useNavigate();
  const [members, setMembers] = useState(userProfile.members);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Household Members" subtitle={`${members.length} people`} backRoute="/profile" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        <div className="bg-brand-zest-50 border border-brand-zest-200 rounded-2xl p-4 flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-brand-zest-100 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-brand-zest-600" />
          </div>
          <p className="text-xs text-brand-zest-800 leading-relaxed font-medium">
            Adding members helps AI plan accurate portion sizes and combined nutrition goals.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {members.map((member, i) => (
            <div key={i} className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-zest-400 to-brand-sage-400 flex items-center justify-center text-white font-extrabold shadow-sm">
                {member.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-extrabold text-text-primary text-sm">{member.name}</p>
                  {i === 0 && <Crown className="w-3.5 h-3.5 text-warning" />}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{member.role}</p>
              </div>
              {i !== 0 && (
                <button className="p-2 text-error hover:bg-error-bg rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <Button variant="outline" icon={<UserPlus className="w-5 h-5" />}>
          Invite Member
        </Button>
      </div>
    </div>
  );
}
