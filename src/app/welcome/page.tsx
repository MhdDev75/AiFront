"use client"

import { Card, CardContent } from '@/components/ui/card';


const WelcomePage: React.FC = () => {
    return (
        <div className="p-1">
            <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">5</span>
                </CardContent>
            </Card>
        </div>

    );
};

export default WelcomePage;
